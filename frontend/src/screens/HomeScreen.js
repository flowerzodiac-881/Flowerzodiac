import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useProfile } from '../context/ProfileContext';
import { MODULE_DEFINITIONS } from '../constants/modules';

/**
 * Home / Dashboard screen. Shows only enabled modules.
 */
export function HomeScreen({ navigation }) {
  const { theme, enabledModules } = useProfile();

  const active = MODULE_DEFINITIONS.filter((m) => enabledModules[m.key]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text
        style={[styles.heading, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.xl }]}
        accessibilityRole="header"
      >
        Dashboard
      </Text>

      {active.length === 0 ? (
        <Text style={[styles.empty, { color: theme.colors.textSecondary, fontFamily: theme.fontFamily, fontSize: theme.fontSize.md }]}>
          No modules enabled. Go to Settings to enable support modules.
        </Text>
      ) : (
        active.map((mod) => (
          <View
            key={mod.key}
            style={[styles.card, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius }]}
            accessible
            accessibilityLabel={mod.title}
          >
            <Text style={styles.icon}>{mod.icon}</Text>
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.lg }]}>
                {mod.title}
              </Text>
              <Text style={[styles.cardDesc, { color: theme.colors.textSecondary, fontFamily: theme.fontFamily, fontSize: theme.fontSize.sm }]}>
                {mod.description}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontWeight: '700',
    marginBottom: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  icon: {
    fontSize: 36,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: '600',
  },
  cardDesc: {
    marginTop: 4,
  },
});
