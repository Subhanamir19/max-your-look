import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import PhotoUploadScreen from '../screens/PhotoUploadScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import RoutineScreen from '../screens/RoutineScreen';
import ProgressScreen from '../screens/ProgressScreen';
import PremiumLockScreen from '../screens/PremiumLockScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import MainDashboardScreen from '../screens/MainDashboardScreen';

// Define the stack navigator params
export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  PhotoUpload: undefined;
  Analysis: undefined;
  Routine: undefined;
  Progress: undefined;
  PremiumLock: undefined;
  MainDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [freeUseConsumed, setFreeUseConsumed] = useState<boolean>(false);
  
  // Check if it's the first launch
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        
        if (hasLaunched === null) {
          // First time launching the app
          await AsyncStorage.setItem('hasLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
        
        // Get premium status
        const premiumStatus = await AsyncStorage.getItem('isPremium');
        setIsPremium(premiumStatus === 'true');
        
        // Get free use status
        const freeUseStatus = await AsyncStorage.getItem('freeUseConsumed');
        setFreeUseConsumed(freeUseStatus === 'true');
        
      } catch (error) {
        console.error('Error checking first launch:', error);
        setIsFirstLaunch(false);
      }
    };
    
    checkFirstLaunch();
  }, []);
  
  // Wait for the first launch check to complete
  if (isFirstLaunch === null) {
    return null; // or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isFirstLaunch ? 'Onboarding' : 'Home'}
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTintColor: COLORS.black,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: COLORS.white,
          },
        }}
      >
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
          options={{ headerShown: false }}
        />
        
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        
        <Stack.Screen 
          name="PhotoUpload" 
          component={PhotoUploadScreen}
          options={{ title: 'Take a Photo' }}
        />
        
        <Stack.Screen 
          name="Analysis" 
          component={AnalysisScreen}
          options={{ title: 'Your Analysis' }}
        />
        
        <Stack.Screen 
          name="Routine" 
          component={RoutineScreen}
          options={{ title: 'Daily Routine' }}
        />
        
        <Stack.Screen 
          name="Progress" 
          component={ProgressScreen}
          options={{ title: 'Your Progress' }}
        />
        
        <Stack.Screen 
          name="PremiumLock" 
          component={PremiumLockScreen}
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }}
        />
        
        <Stack.Screen 
          name="MainDashboard" 
          component={MainDashboardScreen}
          options={{ 
            headerShown: false,
            presentation: 'card'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 