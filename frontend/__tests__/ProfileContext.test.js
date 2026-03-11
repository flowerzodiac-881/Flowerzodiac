import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { ProfileProvider, useProfile } from '../src/context/ProfileContext';
import { MODULE_KEYS } from '../src/constants/modules';

function wrapper({ children }) {
  return <ProfileProvider>{children}</ProfileProvider>;
}

describe('ProfileContext', () => {
  it('provides initial state with onboarding incomplete', () => {
    const { result } = renderHook(() => useProfile(), { wrapper });
    expect(result.current.onboardingComplete).toBe(false);
  });

  it('enables a module', () => {
    const { result } = renderHook(() => useProfile(), { wrapper });
    act(() => {
      result.current.setModuleEnabled(MODULE_KEYS.SENSORY, true);
    });
    expect(result.current.enabledModules[MODULE_KEYS.SENSORY]).toBe(true);
  });

  it('sets multiple modules at once', () => {
    const { result } = renderHook(() => useProfile(), { wrapper });
    act(() => {
      result.current.setAllModules({
        [MODULE_KEYS.ADHD]: true,
        [MODULE_KEYS.LEARNING]: true,
      });
    });
    expect(result.current.enabledModules[MODULE_KEYS.ADHD]).toBe(true);
    expect(result.current.enabledModules[MODULE_KEYS.LEARNING]).toBe(true);
    expect(result.current.enabledModules[MODULE_KEYS.MOTOR]).toBe(false);
  });

  it('sets a preference', () => {
    const { result } = renderHook(() => useProfile(), { wrapper });
    act(() => {
      result.current.setPreference('darkMode', true);
    });
    expect(result.current.darkMode).toBe(true);
    // dark mode should resolve to dark palette
    expect(result.current.theme.colors.background).toBe('#121212');
  });

  it('completes onboarding', () => {
    const { result } = renderHook(() => useProfile(), { wrapper });
    act(() => {
      result.current.completeOnboarding();
    });
    expect(result.current.onboardingComplete).toBe(true);
  });

  it('resets profile to initial state', () => {
    const { result } = renderHook(() => useProfile(), { wrapper });
    act(() => {
      result.current.setModuleEnabled(MODULE_KEYS.SENSORY, true);
      result.current.setPreference('darkMode', true);
    });
    expect(result.current.enabledModules[MODULE_KEYS.SENSORY]).toBe(true);
    act(() => {
      result.current.resetProfile();
    });
    expect(result.current.enabledModules[MODULE_KEYS.SENSORY]).toBe(false);
    expect(result.current.darkMode).toBe(false);
  });

  it('provides correct theme based on fontFamily and size', () => {
    const { result } = renderHook(() => useProfile(), { wrapper });
    act(() => {
      result.current.setPreference('fontFamily', 'OpenDyslexic');
      result.current.setPreference('fontSizeMultiplier', 1.5);
    });
    expect(result.current.theme.fontFamily).toBe('OpenDyslexic');
    expect(result.current.theme.fontSize.md).toBe(24); // 16 * 1.5
  });

  it('adjusts tap target size when largeTapTargets is enabled', () => {
    const { result } = renderHook(() => useProfile(), { wrapper });
    expect(result.current.theme.tapMinSize).toBe(44);
    act(() => {
      result.current.setPreference('largeTapTargets', true);
    });
    expect(result.current.theme.tapMinSize).toBe(56);
  });

  it('loads a profile snapshot', () => {
    const { result } = renderHook(() => useProfile(), { wrapper });
    act(() => {
      result.current.loadProfile({
        onboardingComplete: true,
        darkMode: true,
        enabledModules: {
          sensory: true,
          adhd: false,
          learning: true,
          motor: false,
          anxiety: false,
          synesthesia: false,
        },
      });
    });
    expect(result.current.onboardingComplete).toBe(true);
    expect(result.current.darkMode).toBe(true);
    expect(result.current.enabledModules[MODULE_KEYS.SENSORY]).toBe(true);
    expect(result.current.enabledModules[MODULE_KEYS.LEARNING]).toBe(true);
  });

  it('throws when useProfile is used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      renderHook(() => useProfile());
    }).toThrow('useProfile must be used within a ProfileProvider');
    consoleSpy.mockRestore();
  });
});
