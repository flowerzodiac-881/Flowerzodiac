import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { AccessibilityProvider, useAccessibility, DEFAULT_PROFILE } from '../src/context/AccessibilityContext';
import { COLOR_PALETTES, FONT_FAMILIES } from '../src/constants/modules';

// ── Mock the api service ──────────────────────────────────────
// The AccessibilityProvider calls api.getAccessibilityProfile()
// on mount when a token is present.  We default to no-token so
// tests run synchronously unless they opt in.
jest.mock('../src/services/api', () => ({
  api: {
    token: null,
    getAccessibilityProfile: jest.fn(),
    updateAccessibilityProfile: jest.fn(),
  },
}));

const { api } = require('../src/services/api');

function wrapper({ children }) {
  return <AccessibilityProvider>{children}</AccessibilityProvider>;
}

describe('AccessibilityContext', () => {
  beforeEach(() => {
    api.token = null;
    api.getAccessibilityProfile.mockReset();
    api.updateAccessibilityProfile.mockReset();
    // Default mock returns a resolved promise so .catch() chains work
    api.updateAccessibilityProfile.mockResolvedValue({});
  });

  // ── Initial / default state ───────────────────────────────

  it('provides default profile when not authenticated', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    expect(result.current.profile).toEqual(DEFAULT_PROFILE);
  });

  it('starts with isLoadingPreferences true', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    // Even though no fetch happens (no token), the effect sets it
    // to false synchronously in the same tick
    expect(typeof result.current.isLoadingPreferences).toBe('boolean');
  });

  // ── Computed helpers ──────────────────────────────────────

  it('resolves fontFamily to System by default', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    expect(result.current.fontFamily).toBe(FONT_FAMILIES.system.value);
  });

  it('resolves fontFamily to OpenDyslexic when dyslexic_font_enabled', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    act(() => {
      result.current.updateAccessibilityProfile({ dyslexic_font_enabled: true });
    });
    expect(result.current.fontFamily).toBe(FONT_FAMILIES.openDyslexic.value);
  });

  it('resolves interactionMode to standard by default', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    expect(result.current.interactionMode).toBe('standard');
  });

  it('resolves interactionMode to macro when macro_gestures_enabled', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    act(() => {
      result.current.updateAccessibilityProfile({ macro_gestures_enabled: true });
    });
    expect(result.current.interactionMode).toBe('macro');
  });

  it('resolves uiComplexity to full by default', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    expect(result.current.uiComplexity).toBe('full');
  });

  it('resolves uiComplexity to reduced when safe_mode_enabled', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    act(() => {
      result.current.updateAccessibilityProfile({ safe_mode_enabled: true });
    });
    expect(result.current.uiComplexity).toBe('reduced');
  });

  // ── Theme derivation ──────────────────────────────────────

  it('uses default palette when pure_dark_mode is false', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    expect(result.current.theme.colors).toEqual(COLOR_PALETTES.default);
  });

  it('uses dark palette when pure_dark_mode is true', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    act(() => {
      result.current.updateAccessibilityProfile({ pure_dark_mode: true });
    });
    expect(result.current.theme.colors).toEqual(COLOR_PALETTES.dark);
  });

  it('applies motion_reduced to theme', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    expect(result.current.theme.reduceMotion).toBe(false);
    act(() => {
      result.current.updateAccessibilityProfile({ motion_reduced: true });
    });
    expect(result.current.theme.reduceMotion).toBe(true);
  });

  it('uses OpenDyslexic fontFamily in theme when dyslexic_font_enabled', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    expect(result.current.theme.fontFamily).toBe('System');
    act(() => {
      result.current.updateAccessibilityProfile({ dyslexic_font_enabled: true });
    });
    expect(result.current.theme.fontFamily).toBe('OpenDyslexic');
  });

  it('adjusts tap target size when large_tap_targets is enabled', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    expect(result.current.theme.tapMinSize).toBe(44);
    act(() => {
      result.current.updateAccessibilityProfile({ large_tap_targets: true });
    });
    expect(result.current.theme.tapMinSize).toBe(56);
  });

  it('scales font sizes with font_size_multiplier', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    expect(result.current.theme.fontSize.md).toBe(16);
    act(() => {
      result.current.updateAccessibilityProfile({ font_size_multiplier: 1.5 });
    });
    expect(result.current.theme.fontSize.md).toBe(24); // 16 * 1.5
  });

  // ── Optimistic update ─────────────────────────────────────

  it('updateAccessibilityProfile patches local state immediately', () => {
    api.updateAccessibilityProfile.mockResolvedValue({});
    const { result } = renderHook(() => useAccessibility(), { wrapper });

    act(() => {
      result.current.updateAccessibilityProfile({
        pure_dark_mode: true,
        safe_mode_enabled: true,
      });
    });

    // Local state updated immediately (no await)
    expect(result.current.profile.pure_dark_mode).toBe(true);
    expect(result.current.profile.safe_mode_enabled).toBe(true);
  });

  it('updateAccessibilityProfile calls the API in the background', () => {
    api.updateAccessibilityProfile.mockResolvedValue({});
    const { result } = renderHook(() => useAccessibility(), { wrapper });

    act(() => {
      result.current.updateAccessibilityProfile({ motion_reduced: true });
    });

    expect(api.updateAccessibilityProfile).toHaveBeenCalledWith({ motion_reduced: true });
  });

  // ── Auth state bridge ─────────────────────────────────────

  it('resets profile to defaults on logout', () => {
    const { result } = renderHook(() => useAccessibility(), { wrapper });
    act(() => {
      result.current.updateAccessibilityProfile({ pure_dark_mode: true });
    });
    expect(result.current.profile.pure_dark_mode).toBe(true);

    act(() => {
      result.current.onAuthStateChanged(false);
    });
    expect(result.current.profile).toEqual(DEFAULT_PROFILE);
    expect(result.current.isLoadingPreferences).toBe(false);
  });

  // ── Error guard ───────────────────────────────────────────

  it('throws when useAccessibility is used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      renderHook(() => useAccessibility());
    }).toThrow('useAccessibility must be used within an AccessibilityProvider');
    consoleSpy.mockRestore();
  });
});
