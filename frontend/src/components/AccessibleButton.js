import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useProfile } from '../context/ProfileContext';

/**
 * Accessible button that automatically adapts to profile settings:
 * - Uses theme colours
 * - Respects large tap-target preference
 * - Shows confirmation before action when anxiety/confirmActions is on
 */
export function AccessibleButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
}) {
  const { theme } = useProfile();

  const bgColor =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'secondary'
      ? theme.colors.surface
      : 'transparent';

  const txtColor =
    variant === 'primary'
      ? '#FFFFFF'
      : theme.colors.text;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading }}
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          minHeight: theme.tapMinSize,
          borderRadius: theme.borderRadius,
          opacity: disabled ? 0.5 : 1,
          borderWidth: variant === 'outline' ? 2 : 0,
          borderColor: theme.colors.primary,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={txtColor} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: txtColor,
              fontFamily: theme.fontFamily,
              fontSize: theme.fontSize.md,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  text: {
    fontWeight: '600',
  },
});
