import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useProfile } from '../context/ProfileContext';

/**
 * An accessible toggle row for enabling/disabling a setting.
 */
export function ToggleRow({ label, value, onValueChange, description }) {
  const { theme } = useProfile();

  return (
    <View
      style={[styles.row, { borderBottomColor: theme.colors.border }]}
      accessible
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
    >
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: theme.colors.text, fontFamily: theme.fontFamily, fontSize: theme.fontSize.md }]}>
          {label}
        </Text>
        {description ? (
          <Text style={[styles.description, { color: theme.colors.textSecondary, fontFamily: theme.fontFamily, fontSize: theme.fontSize.sm }]}>
            {description}
          </Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  labelContainer: {
    flex: 1,
    marginRight: 16,
  },
  label: {
    fontWeight: '500',
  },
  description: {
    marginTop: 4,
  },
});
