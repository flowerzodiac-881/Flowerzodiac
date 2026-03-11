/**
 * Module definitions for the profile-driven modularity system.
 * Each module maps to specific neurodivergent needs.
 */
export const MODULE_KEYS = {
  SENSORY: 'sensory',
  ADHD: 'adhd',
  LEARNING: 'learning',
  MOTOR: 'motor',
  ANXIETY: 'anxiety',
  SYNESTHESIA: 'synesthesia',
};

export const MODULE_DEFINITIONS = [
  {
    key: MODULE_KEYS.SENSORY,
    title: 'Sensory Controls',
    subtitle: 'ASD / SPD',
    description: 'Dark mode, muted palettes, zero-animation mode',
    icon: '🎨',
  },
  {
    key: MODULE_KEYS.ADHD,
    title: 'Executive Function',
    subtitle: 'ADHD',
    description: 'Micro-tasks, Pomodoro timers, optional gamification',
    icon: '⏱️',
  },
  {
    key: MODULE_KEYS.LEARNING,
    title: 'Learning Support',
    subtitle: 'Dyslexia / Dyscalculia / Dysgraphia',
    description: 'OpenDyslexic font, TTS/STT, visual numbers',
    icon: '📖',
  },
  {
    key: MODULE_KEYS.MOTOR,
    title: 'Motor & Coordination',
    subtitle: 'Dyspraxia / DCD / Tourette',
    description: 'Large tap targets, gesture navigation, voice control',
    icon: '🤲',
  },
  {
    key: MODULE_KEYS.ANXIETY,
    title: 'Anxiety & OCD',
    subtitle: 'Anxiety / OCD',
    description: 'Predictable navigation, safe mode, confirmation dialogs',
    icon: '🛡️',
  },
  {
    key: MODULE_KEYS.SYNESTHESIA,
    title: 'Synesthesia',
    subtitle: 'Synesthesia',
    description: 'Custom color/sound/icon mappings for categories',
    icon: '🌈',
  },
];

/**
 * Color palettes for sensory preferences.
 */
export const COLOR_PALETTES = {
  default: {
    name: 'Default',
    primary: '#6C63FF',
    secondary: '#4834D4',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#1A1A2E',
    textSecondary: '#666666',
    border: '#E0E0E0',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
  },
  muted: {
    name: 'Muted Pastel',
    primary: '#8B9DC3',
    secondary: '#6B7A8D',
    background: '#FAF8F5',
    surface: '#F0EDE8',
    text: '#3D3D3D',
    textSecondary: '#7A7A7A',
    border: '#D6D1C9',
    success: '#8FBC8F',
    error: '#CD9B9B',
    warning: '#DEB887',
  },
  dark: {
    name: 'Dark',
    primary: '#BB86FC',
    secondary: '#6200EE',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#E0E0E0',
    textSecondary: '#A0A0A0',
    border: '#333333',
    success: '#81C784',
    error: '#EF9A9A',
    warning: '#FFB74D',
  },
  highContrast: {
    name: 'High Contrast',
    primary: '#FFFF00',
    secondary: '#00FFFF',
    background: '#000000',
    surface: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    border: '#FFFFFF',
    success: '#00FF00',
    error: '#FF0000',
    warning: '#FFA500',
  },
};

/**
 * Font families available for learning support.
 */
export const FONT_FAMILIES = {
  system: { label: 'System Default', value: 'System' },
  openDyslexic: { label: 'OpenDyslexic', value: 'OpenDyslexic' },
  arial: { label: 'Arial', value: 'Arial' },
  verdana: { label: 'Verdana', value: 'Verdana' },
};

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
