import 'react-native-url-polyfill/auto';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './app/navigation/AppNavigator';
import { COLORS } from './app/constants/theme';
import { AnalysisProvider } from './app/contexts/AnalysisContext';
import { supabase } from './app/lib/supabase';

// Initialize Supabase client
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user?.id);
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  }
});

export default function App() {
  return (
    <SafeAreaProvider>
      <AnalysisProvider>
        <StatusBar style="dark" backgroundColor={COLORS.white} />
        <AppNavigator />
      </AnalysisProvider>
    </SafeAreaProvider>
  );
} 