import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useProfile } from '../context/ProfileContext';

/**
 * A card for selecting/toggling a module during onboarding.
 */
export function ModuleCard({ module, enabled, onToggle }) {
  const { theme } = useProfile();

  return (
    <TouchableOpacity
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityLabel={`${module.title}: ${module.description}`}
      accessibilityState={{ checked: enabled }}
      style={[
        styles.card,
        {
          backgroundColor: enabled ? theme.colors.primary + '15' : theme.colors.surface,
          borderColor: enabled ? theme.colors.primary : theme.colors.border,
          minHeight: theme.tapMinSize,
          borderRadius: theme.borderRadius,
        },
      ]}
    >
      <Text style={styles.icon}>{module.icon}</Text>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.md }]}>
          {module.title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary, fontFamily: theme.fontFamily, fontSize: theme.fontSize.sm }]}>
          {module.subtitle}
        </Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary, fontFamily: theme.fontFamily, fontSize: theme.fontSize.xs }]}>
          {module.description}
        </Text>
      </View>
      <View
        style={[
          styles.checkBox,
          {
            borderColor: enabled ? theme.colors.primary : theme.colors.border,
            backgroundColor: enabled ? theme.colors.primary : 'transparent',
          },
        ]}
      >
        {enabled && <Text style={styles.check}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderWidth: 2,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 2,
  },
  description: {
    marginTop: 4,
  },
  checkBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  check: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
