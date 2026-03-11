import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import { COLOR_PALETTES, MODULE_KEYS } from '../constants/modules';

/**
 * ProfileContext — the "Profile-Driven Modularity" core.
 *
 * This context drives ALL visual, behavioural and accessibility
 * settings across the entire application.  Every component that
 * cares about fonts, colours, motion, tap-target size, etc.
 * reads from this single source of truth.
 */

// ── Initial state ─────────────────────────────────────────────
const initialState = {
  // Onboarding complete flag
  onboardingComplete: false,

  // Which modules the user has enabled
  enabledModules: {
    [MODULE_KEYS.SENSORY]: false,
    [MODULE_KEYS.ADHD]: false,
    [MODULE_KEYS.LEARNING]: false,
    [MODULE_KEYS.MOTOR]: false,
    [MODULE_KEYS.ANXIETY]: false,
    [MODULE_KEYS.SYNESTHESIA]: false,
  },

  // ── Sensory controls ──
  colorPalette: 'default',   // key into COLOR_PALETTES
  darkMode: false,
  reduceMotion: false,

  // ── Learning ──
  fontFamily: 'System',
  fontSizeMultiplier: 1.0,
  ttsEnabled: false,
  sttEnabled: false,
  visualNumbers: false,

  // ── Motor ──
  largeTapTargets: false,
  gestureNavigation: false,
  voiceNavigation: false,
  undoConfirmation: true,

  // ── Anxiety / OCD ──
  safeMode: false,
  confirmActions: true,
  hideStreaks: false,
  hideNotifications: false,

  // ── ADHD ──
  pomodoroWorkMinutes: 25,
  pomodoroBreakMinutes: 5,
  gamificationEnabled: false,

  // ── Synesthesia ──
  synesthesiaMappings: [],
};

// ── Action types ──────────────────────────────────────────────
const ActionTypes = {
  SET_MODULE_ENABLED: 'SET_MODULE_ENABLED',
  SET_ALL_MODULES: 'SET_ALL_MODULES',
  SET_PREFERENCE: 'SET_PREFERENCE',
  COMPLETE_ONBOARDING: 'COMPLETE_ONBOARDING',
  RESET_PROFILE: 'RESET_PROFILE',
  LOAD_PROFILE: 'LOAD_PROFILE',
};

// ── Reducer ───────────────────────────────────────────────────
function profileReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_MODULE_ENABLED:
      return {
        ...state,
        enabledModules: {
          ...state.enabledModules,
          [action.payload.key]: action.payload.enabled,
        },
      };

    case ActionTypes.SET_ALL_MODULES:
      return {
        ...state,
        enabledModules: { ...state.enabledModules, ...action.payload },
      };

    case ActionTypes.SET_PREFERENCE:
      return { ...state, [action.payload.key]: action.payload.value };

    case ActionTypes.COMPLETE_ONBOARDING:
      return { ...state, onboardingComplete: true };

    case ActionTypes.RESET_PROFILE:
      return { ...initialState };

    case ActionTypes.LOAD_PROFILE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────
const ProfileContext = createContext(undefined);

export function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  // ── Derived theme ─────────────────────────────────────────
  const resolvedPaletteKey = state.darkMode ? 'dark' : state.colorPalette;
  const colors = COLOR_PALETTES[resolvedPaletteKey] || COLOR_PALETTES.default;

  const theme = useMemo(() => {
    const baseFontSize = 16 * state.fontSizeMultiplier;
    const tapMinSize = state.largeTapTargets ? 56 : 44;

    return {
      colors,
      fontFamily: state.fontFamily,
      fontSize: {
        xs: baseFontSize * 0.75,
        sm: baseFontSize * 0.875,
        md: baseFontSize,
        lg: baseFontSize * 1.25,
        xl: baseFontSize * 1.5,
        xxl: baseFontSize * 2,
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
      },
      tapMinSize,
      borderRadius: 8,
      reduceMotion: state.reduceMotion,
    };
  }, [colors, state.fontFamily, state.fontSizeMultiplier, state.largeTapTargets, state.reduceMotion]);

  // ── Action creators ───────────────────────────────────────
  const setModuleEnabled = useCallback((key, enabled) => {
    dispatch({ type: ActionTypes.SET_MODULE_ENABLED, payload: { key, enabled } });
  }, []);

  const setAllModules = useCallback((modules) => {
    dispatch({ type: ActionTypes.SET_ALL_MODULES, payload: modules });
  }, []);

  const setPreference = useCallback((key, value) => {
    dispatch({ type: ActionTypes.SET_PREFERENCE, payload: { key, value } });
  }, []);

  const completeOnboarding = useCallback(() => {
    dispatch({ type: ActionTypes.COMPLETE_ONBOARDING });
  }, []);

  const resetProfile = useCallback(() => {
    dispatch({ type: ActionTypes.RESET_PROFILE });
  }, []);

  const loadProfile = useCallback((profile) => {
    dispatch({ type: ActionTypes.LOAD_PROFILE, payload: profile });
  }, []);

  const value = useMemo(() => ({
    ...state,
    theme,
    setModuleEnabled,
    setAllModules,
    setPreference,
    completeOnboarding,
    resetProfile,
    loadProfile,
  }), [state, theme, setModuleEnabled, setAllModules, setPreference, completeOnboarding, resetProfile, loadProfile]);

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

/**
 * Hook to access the profile context.
 */
export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (ctx === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return ctx;
}

export { initialState, ActionTypes };
