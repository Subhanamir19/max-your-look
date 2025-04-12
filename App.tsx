import 'react-native-url-polyfill/auto';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './app/navigation/AppNavigator';
import { COLORS } from './app/constants/theme';
import { AnalysisProvider } from './app/contexts/AnalysisContext';
import { supabase } from './app/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Supabase client
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user?.id);
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  }
});

export default function App() {
  // Check and initialize premium status on app start
  useEffect(() => {
    const initializePremiumStatus = async () => {
      try {
        // Check if premium status exists
        const premiumStatus = await AsyncStorage.getItem('isPremium');
        
        // If it doesn't exist, initialize it
        if (premiumStatus === null) {
          await AsyncStorage.setItem('isPremium', 'false');
        }
        
        // Check if free use status exists
        const freeUseStatus = await AsyncStorage.getItem('freeUseConsumed');
        
        // If it doesn't exist, initialize it
        if (freeUseStatus === null) {
          await AsyncStorage.setItem('freeUseConsumed', 'false');
        }
      } catch (error) {
        console.error('Error initializing premium status:', error);
      }
    };
    
    initializePremiumStatus();
  }, []);

  return (
    <SafeAreaProvider>
      <AnalysisProvider>
        <StatusBar style="dark" backgroundColor={COLORS.white} />
        <AppNavigator />
      </AnalysisProvider>
    </SafeAreaProvider>
  );
} 