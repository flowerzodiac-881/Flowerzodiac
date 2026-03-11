import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useProfile } from '../context/ProfileContext';
import { ToggleRow } from '../components/ToggleRow';
import { MODULE_DEFINITIONS } from '../constants/modules';
import { ModuleCard } from '../components/ModuleCard';
import { AccessibleButton } from '../components/AccessibleButton';

/**
 * Settings screen: allows users to toggle modules and adjust preferences.
 */
export function SettingsScreen() {
  const profile = useProfile();
  const { theme, enabledModules, setModuleEnabled, setPreference, resetProfile } = profile;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text
        style={[styles.heading, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.xl }]}
        accessibilityRole="header"
      >
        Settings
      </Text>

      <Text
        style={[styles.section, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.lg }]}
        accessibilityRole="header"
      >
        Support Modules
      </Text>
      {MODULE_DEFINITIONS.map((mod) => (
        <ModuleCard
          key={mod.key}
          module={mod}
          enabled={enabledModules[mod.key]}
          onToggle={() => setModuleEnabled(mod.key, !enabledModules[mod.key])}
        />
      ))}

      {enabledModules.sensory && (
        <>
          <Text style={[styles.section, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.lg }]} accessibilityRole="header">
            Sensory Controls
          </Text>
          <ToggleRow label="Dark Mode" description="Use a dark color scheme" value={profile.darkMode} onValueChange={(v) => setPreference('darkMode', v)} />
          <ToggleRow label="Muted Palette" description="Use soft pastel colours" value={profile.colorPalette === 'muted'} onValueChange={(v) => setPreference('colorPalette', v ? 'muted' : 'default')} />
          <ToggleRow label="Reduce Motion" description="Disable all animations" value={profile.reduceMotion} onValueChange={(v) => setPreference('reduceMotion', v)} />
        </>
      )}

      {enabledModules.learning && (
        <>
          <Text style={[styles.section, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.lg }]} accessibilityRole="header">
            Learning Support
          </Text>
          <ToggleRow label="OpenDyslexic Font" description="Switch to the OpenDyslexic typeface" value={profile.fontFamily === 'OpenDyslexic'} onValueChange={(v) => setPreference('fontFamily', v ? 'OpenDyslexic' : 'System')} />
          <ToggleRow label="Text-to-Speech" description="Enable spoken feedback" value={profile.ttsEnabled} onValueChange={(v) => setPreference('ttsEnabled', v)} />
          <ToggleRow label="Speech-to-Text" description="Enable voice input" value={profile.sttEnabled} onValueChange={(v) => setPreference('sttEnabled', v)} />
          <ToggleRow label="Visual Numbers" description="Show numbers as charts or blocks" value={profile.visualNumbers} onValueChange={(v) => setPreference('visualNumbers', v)} />
        </>
      )}

      {enabledModules.motor && (
        <>
          <Text style={[styles.section, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.lg }]} accessibilityRole="header">
            Motor Controls
          </Text>
          <ToggleRow label="Large Tap Targets" description="Increase touch target sizes" value={profile.largeTapTargets} onValueChange={(v) => setPreference('largeTapTargets', v)} />
          <ToggleRow label="Gesture Navigation" description="Use swipes instead of taps" value={profile.gestureNavigation} onValueChange={(v) => setPreference('gestureNavigation', v)} />
          <ToggleRow label="Voice Navigation" description="Navigate with voice commands" value={profile.voiceNavigation} onValueChange={(v) => setPreference('voiceNavigation', v)} />
          <ToggleRow label="Undo Confirmation" description="Confirm before undoing actions" value={profile.undoConfirmation} onValueChange={(v) => setPreference('undoConfirmation', v)} />
        </>
      )}

      {enabledModules.anxiety && (
        <>
          <Text style={[styles.section, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.lg }]} accessibilityRole="header">
            Anxiety / OCD
          </Text>
          <ToggleRow label="Safe Mode" description="Hide tracking metrics and streaks" value={profile.safeMode} onValueChange={(v) => setPreference('safeMode', v)} />
          <ToggleRow label="Confirm Actions" description="Show confirmation before permanent actions" value={profile.confirmActions} onValueChange={(v) => setPreference('confirmActions', v)} />
          <ToggleRow label="Hide Streaks" description="Remove streak counters" value={profile.hideStreaks} onValueChange={(v) => setPreference('hideStreaks', v)} />
          <ToggleRow label="Hide Notifications" description="Suppress notification badges" value={profile.hideNotifications} onValueChange={(v) => setPreference('hideNotifications', v)} />
        </>
      )}

      {enabledModules.adhd && (
        <>
          <Text style={[styles.section, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.lg }]} accessibilityRole="header">
            ADHD / Executive Function
          </Text>
          <ToggleRow label="Gamification" description="Enable dopamine-regulation rewards" value={profile.gamificationEnabled} onValueChange={(v) => setPreference('gamificationEnabled', v)} />
        </>
      )}

      <AccessibleButton
        title="Reset All Preferences"
        variant="outline"
        onPress={resetProfile}
        style={styles.resetButton}
        accessibilityHint="Resets all settings to defaults and returns to onboarding"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingVertical: 24, paddingBottom: 60 },
  heading: { fontWeight: '700', paddingHorizontal: 16, marginBottom: 16 },
  section: { fontWeight: '600', paddingHorizontal: 16, marginTop: 24, marginBottom: 8 },
  resetButton: { marginHorizontal: 16, marginTop: 32 },
});
