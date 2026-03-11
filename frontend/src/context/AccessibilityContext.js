import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { api } from '../services/api';
import { COLOR_PALETTES, FONT_FAMILIES } from '../constants/modules';

/**
 * AccessibilityContext — fetches and applies the user's
 * accessibility_profiles row from Supabase so every component
 * in the tree can read the resolved visual / interaction state.
 *
 * Key design goals:
 * 1. **Flicker prevention** — `isLoadingPreferences` stays `true`
 *    until the profile has been fetched, so the app can render a
 *    neutral loading screen instead of flashing a bright/high-motion UI.
 * 2. **Optimistic updates** — `updateAccessibilityProfile()` writes
 *    to local state immediately for a snappy UI and pushes the update
 *    to the API in the background.
 * 3. **Computed helpers** — `theme`, `fontFamily`, `interactionMode`
 *    and `uiComplexity` are derived from the raw profile booleans.
 */

// ── Default raw profile (mirrors backend DEFAULT_PROFILE) ─────
const DEFAULT_PROFILE = {
  pure_dark_mode: false,
  motion_reduced: false,
  color_palette: 'default',
  reduce_transparency: false,
  dyslexic_font_enabled: false,
  font_size_multiplier: 1.0,
  tts_enabled: false,
  stt_enabled: false,
  visual_numbers: false,
  macro_gestures_enabled: false,
  large_tap_targets: false,
  voice_navigation: false,
  undo_confirmation: true,
  safe_mode_enabled: false,
  confirm_actions: true,
  hide_streaks: false,
  hide_notifications: false,
  pomodoro_work_minutes: 25,
  pomodoro_break_minutes: 5,
  gamification_enabled: false,
};

// ── Context ───────────────────────────────────────────────────
const AccessibilityContext = createContext(undefined);

/**
 * Resolves a color palette key to a concrete COLOR_PALETTES entry.
 * `pure_dark_mode` always wins over the stored `color_palette`.
 */
function resolvePalette(profile) {
  if (profile.pure_dark_mode) return COLOR_PALETTES.dark;
  return COLOR_PALETTES[profile.color_palette] || COLOR_PALETTES.default;
}

// ── Provider ──────────────────────────────────────────────────
export function AccessibilityProvider({ children }) {
  // Raw profile state — each key maps 1-to-1 with the database column
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  // True until the first fetch completes (success *or* failure).
  // While true, the app should show a neutral loading state to
  // avoid flashing bright/white/high-motion screens.
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(true);

  // Tracks whether we have a valid API token (i.e. the user is
  // authenticated).  If not, we skip the fetch and fall back to
  // the defaults above.
  const [isAuthenticated, setIsAuthenticated] = useState(!!api.token);

  // ── Fetch profile on mount ────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function fetchProfile() {
      try {
        // Only fetch if the user is authenticated (token is set)
        if (!api.token) {
          return;
        }
        const data = await api.getAccessibilityProfile();
        if (!cancelled) {
          // Merge server response over defaults to fill any
          // columns that might be NULL / missing
          setProfile((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        // On error we silently keep the safe defaults — the user
        // will not see a jarring UI
        console.warn('Failed to load accessibility profile:', err.message);
      } finally {
        if (!cancelled) {
          setIsLoadingPreferences(false);
        }
      }
    }

    fetchProfile();
    return () => { cancelled = true; };
  }, [isAuthenticated]);

  // ── Optimistic update function ────────────────────────────
  // Instantly patches local state for a snappy UI, then pushes
  // the delta to the API in the background.
  const updateAccessibilityProfile = useCallback((newSettings) => {
    // 1. Optimistic local update
    setProfile((prev) => ({ ...prev, ...newSettings }));

    // 2. Background API sync — fire-and-forget
    api.updateAccessibilityProfile(newSettings).catch((err) => {
      console.warn('Background profile sync failed:', err.message);
      // We intentionally do NOT roll back — the user should see
      // their intended preference immediately and the next save
      // attempt will pick it up.
    });
  }, []);

  // Allow components to re-trigger fetch when auth state changes
  const onAuthStateChanged = useCallback((authenticated) => {
    setIsAuthenticated(authenticated);
    if (!authenticated) {
      // Reset to defaults when the user logs out
      setProfile(DEFAULT_PROFILE);
      setIsLoadingPreferences(false);
    } else {
      setIsLoadingPreferences(true);
    }
  }, []);

  // ── Derived: theme ────────────────────────────────────────
  // Evaluates pure_dark_mode + motion_reduced + font + sizing
  const theme = useMemo(() => {
    const colors = resolvePalette(profile);
    const baseFontSize = 16 * profile.font_size_multiplier;
    const tapMinSize = profile.large_tap_targets ? 56 : 44;

    return {
      colors,
      fontFamily: profile.dyslexic_font_enabled
        ? FONT_FAMILIES.openDyslexic.value
        : FONT_FAMILIES.system.value,
      fontSize: {
        xs: baseFontSize * 0.75,
        sm: baseFontSize * 0.875,
        md: baseFontSize,
        lg: baseFontSize * 1.25,
        xl: baseFontSize * 1.5,
        xxl: baseFontSize * 2,
      },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
      tapMinSize,
      borderRadius: 8,
      reduceMotion: profile.motion_reduced,
      reduceTransparency: profile.reduce_transparency,
    };
  }, [
    profile.pure_dark_mode,
    profile.color_palette,
    profile.motion_reduced,
    profile.reduce_transparency,
    profile.dyslexic_font_enabled,
    profile.font_size_multiplier,
    profile.large_tap_targets,
  ]);

  // ── Derived: fontFamily ───────────────────────────────────
  // Convenience string — toggled to OpenDyslexic when the
  // dyslexic_font_enabled flag is true.
  const fontFamily = useMemo(
    () =>
      profile.dyslexic_font_enabled
        ? FONT_FAMILIES.openDyslexic.value
        : FONT_FAMILIES.system.value,
    [profile.dyslexic_font_enabled],
  );

  // ── Derived: interactionMode ──────────────────────────────
  // When macro_gestures_enabled is true the frontend should
  // enlarge hit areas, simplify gestures (no long-press / swipe)
  // and enable voice navigation.
  const interactionMode = useMemo(
    () => (profile.macro_gestures_enabled ? 'macro' : 'standard'),
    [profile.macro_gestures_enabled],
  );

  // ── Derived: uiComplexity ─────────────────────────────────
  // "reduced" hides streaks, metrics, gamification badges and
  // any other elements that may trigger anxiety / OCD spirals.
  const uiComplexity = useMemo(
    () => (profile.safe_mode_enabled ? 'reduced' : 'full'),
    [profile.safe_mode_enabled],
  );

  // ── Context value ─────────────────────────────────────────
  const value = useMemo(
    () => ({
      // Raw profile — components that need a specific flag can
      // read `profile.tts_enabled`, etc.
      profile,

      // Loading flag for flicker prevention
      isLoadingPreferences,

      // Computed helpers
      theme,
      fontFamily,
      interactionMode,
      uiComplexity,

      // Mutation
      updateAccessibilityProfile,

      // Auth state bridge
      onAuthStateChanged,
    }),
    [
      profile,
      isLoadingPreferences,
      theme,
      fontFamily,
      interactionMode,
      uiComplexity,
      updateAccessibilityProfile,
      onAuthStateChanged,
    ],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

/**
 * Custom hook — any component can call `useAccessibility()` to
 * consume the resolved accessibility state and helpers.
 *
 * Usage:
 *   const { theme, fontFamily, interactionMode, uiComplexity,
 *           isLoadingPreferences, updateAccessibilityProfile } = useAccessibility();
 */
export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (ctx === undefined) {
    throw new Error(
      'useAccessibility must be used within an AccessibilityProvider',
    );
  }
  return ctx;
}

export { DEFAULT_PROFILE };
