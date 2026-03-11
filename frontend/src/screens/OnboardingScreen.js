import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useProfile } from '../context/ProfileContext';
import { MODULE_DEFINITIONS } from '../constants/modules';
import { ModuleCard } from '../components/ModuleCard';
import { AccessibleButton } from '../components/AccessibleButton';

/**
 * Onboarding screen: users toggle which support modules they want.
 * This is the entry point that enables "Profile-Driven Modularity".
 */
export function OnboardingScreen() {
  const { theme, enabledModules, setModuleEnabled, completeOnboarding } = useProfile();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text
        style={[styles.heading, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.xxl }]}
        accessibilityRole="header"
      >
        Welcome to NeuroFlow
      </Text>

      <Text
        style={[styles.subheading, { color: theme.colors.textSecondary, fontFamily: theme.fontFamily, fontSize: theme.fontSize.md }]}
      >
        Choose the support modules that match your needs.{'\n'}You can change these anytime in Settings.
      </Text>

      {MODULE_DEFINITIONS.map((mod) => (
        <ModuleCard
          key={mod.key}
          module={mod}
          enabled={enabledModules[mod.key]}
          onToggle={() => setModuleEnabled(mod.key, !enabledModules[mod.key])}
        />
      ))}

      <View style={styles.buttonContainer}>
        <AccessibleButton
          title="Get Started"
          onPress={completeOnboarding}
          accessibilityHint="Completes onboarding and opens the main app"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 40,
    paddingBottom: 60,
  },
  heading: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subheading: {
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
});
