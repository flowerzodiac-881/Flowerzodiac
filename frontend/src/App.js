import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { ProfileProvider, useProfile } from './context/ProfileContext';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { TasksScreen } from './screens/TasksScreen';
import { JournalScreen } from './screens/JournalScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: '🏠',
  Tasks: '📋',
  Journal: '📓',
  Settings: '⚙️',
};

function MainTabs() {
  const { theme, enabledModules } = useProfile();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => (
          <Text style={{ fontSize: 22 }}>{TAB_ICONS[route.name]}</Text>
        ),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontFamily: theme.fontFamily,
        },
        tabBarLabelStyle: {
          fontFamily: theme.fontFamily,
          fontSize: theme.fontSize.xs,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard' }} />
      {(enabledModules.adhd || enabledModules.motor) && (
        <Tab.Screen name="Tasks" component={TasksScreen} />
      )}
      <Tab.Screen name="Journal" component={JournalScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { onboardingComplete, darkMode } = useProfile();

  if (!onboardingComplete) {
    return <OnboardingScreen />;
  }

  return (
    <>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <AppContent />
    </ProfileProvider>
  );
}
