# Implementation Plan for "Max Your Look" Mobile App

This document outlines a comprehensive plan for building the "Max Your Look" mobile app. It covers all required features—project setup, database and authentication, onboarding, photo upload and analysis, personalized routines, progress tracking, premium features, and testing—ensuring a modular and actionable approach.

---

## 1. Project Setup

### Step 1: Initialize Expo Project
- **Task**: Set up a new Expo project with TypeScript.
- **Files**:
  - `package.json`: Add dependencies (`expo`, `react-native`, `typescript`, `@types/react`).
  - `tsconfig.json`: Enable strict mode and configure TypeScript settings.
  - `app.json`: Define app metadata (name: "Max Your Look", icon, splash screen).
- **Dependencies**: None
- **Instructions**: Run `npx create-expo-app max-your-look --template blank-typescript` in the terminal.

### Step 2: Install Core Libraries
- **Task**: Install libraries for navigation, state management, styling, and APIs.
- **Files**:
  - `package.json`: Add `react-navigation`, `redux`, `@reduxjs/toolkit`, `tailwind-rn`, `supabase-js`, `expo-image`, `react-native-safe-area-context`, `react-native-encrypted-storage`, `expo-constants`, `expo-permissions`, `expo-updates`.
- **Dependencies**: Step 1
- **Instructions**: Run `npx expo install [library]` for each dependency.

### Step 3: Configure Tailwind CSS
- **Task**: Set up Tailwind CSS with the app’s color palette (black, white, gold).
- **Files**:
  - `tailwind.config.js`: Define custom colors (`black: '#000000'`, `white: '#FFFFFF'`, `gold: '#FFD700'`).
  - `global.css`: Import Tailwind base, components, and utilities.
- **Dependencies**: Step 2
- **Instructions**: Follow the Tailwind RN setup guide and apply styles globally.

---

## 2. Database and Authentication

### Step 1: Set Up Supabase
- **Task**: Initialize Supabase client and create database schema.
- **Files**:
  - `src/config/supabase.ts`: Initialize Supabase client with URL and anon key.
  - `database.sql`: Create tables (`Users`, `Analyses`, `Routines`) with columns (e.g., `id`, `email`, `createdAt`).
- **Dependencies**: Project Setup (Section 1)
- **Instructions**: Sign up at Supabase, create a project, and run the SQL script in the dashboard.

### Step 2: Implement Authentication
- **Task**: Add email and social login using Supabase Auth.
- **Files**:
  - `src/lib/auth.ts`: Define `signUp`, `signIn`, `signOut` functions.
  - `src/screens/AuthScreen.tsx`: Build UI with email input and OAuth buttons (e.g., Google).
- **Dependencies**: Step 1
- **Instructions**: Use `supabase.auth.signInWithPassword` for email and `signInWithOAuth` for social login.

### Step 3: Add Premium Flags
- **Task**: Extend user profiles with premium status and free use tracking.
- **Files**:
  - `database.sql`: Add `isPremium` (boolean) and `freeUseConsumed` (boolean) to `Users` table.
  - `src/lib/auth.ts`: Set defaults (`isPremium: false`, `freeUseConsumed: false`) on profile creation.
- **Dependencies**: Step 2
- **Instructions**: Alter the `Users` table in Supabase and test profile updates.

---

## 3. Onboarding

### Step 1: Create Onboarding Screens
- **Task**: Build a 4-slide onboarding flow ending with a signup prompt.
- **Files**:
  - `src/screens/OnboardingScreen.tsx`: Use `FlatList` for swipeable slides.
  - `src/data/slides.ts`: Define slide content (titles, descriptions, images).
- **Dependencies**: Project Setup (Section 1), Authentication (Section 2)
- **Instructions**: Add `OnboardingScreen` as the initial route in the navigation stack.

---

## 4. Photo Upload and Analysis

### Step 1: Build Photo Upload UI
- **Task**: Create a screen for uploading photos with a tips modal.
- **Files**:
  - `src/screens/PhotoUploadScreen.tsx`: Integrate `expo-image-picker` for photo selection.
  - `src/components/TipsModal.tsx`: Display tips (e.g., lighting, angles).
- **Dependencies**: Onboarding (Section 3), Authentication (Section 2)
- **Instructions**: Request camera/gallery permissions using `expo-permissions`.

### Step 2: Integrate Google Vision API
- **Task**: Send photo to Google Vision API and extract facial landmark data.
- **Files**:
  - `src/lib/analysis.ts`: Call Vision API and handle response.
  - `src/lib/scoreCalculator.ts`: Calculate scores (e.g., symmetry, proportions).
- **Dependencies**: Step 1
- **Instructions**: Store API key in `expo-constants` and test with sample images.

### Step 3: Display Scores and Percentage
- **Task**: Show analysis results with scores and overall percentage.
- **Files**:
  - `src/screens/AnalysisScreen.tsx`: Render scores, percentage, and explanations.
- **Dependencies**: Step 2
- **Instructions**: Use Redux to store and retrieve analysis data.

### Step 4: Handle Bad Photos
- **Task**: Detect failed analyses and prompt for retry.
- **Files**:
  - `src/lib/analysis.ts`: Check for errors in Vision API response.
  - `src/components/BadPhotoModal.tsx`: Modal with retry button and error message.
- **Dependencies**: Step 3
- **Instructions**: Trigger modal when `response.error` is present.

---

## 5. Personalized Routines

### Step 1: Generate Routines with OpenAI
- **Task**: Use OpenAI to generate 3-5 daily tasks based on scores.
- **Files**:
  - `src/lib/routine.ts`: Craft prompt and parse OpenAI response.
- **Dependencies**: Photo Upload and Analysis (Section 4)
- **Instructions**: Test prompt: "Generate 3-5 tasks to improve model look based on scores: [scores]."

### Step 2: Display and Cache Routines
- **Task**: Display tasks and cache the first routine offline.
- **Files**:
  - `src/screens/RoutineScreen.tsx`: Render task list with Tailwind styles.
- **Dependencies**: Step 1
- **Instructions**: Cache tasks with `AsyncStorage.setItem('routine', JSON.stringify(tasks))`.

### Step 3: Vary Tasks Daily
- **Task**: Introduce daily task variation using randomization.
- **Files**:
  - `src/lib/routine.ts`: Shuffle tasks based on date seed.
- **Dependencies**: Step 2
- **Instructions**: Use a date-based seed (e.g., `new Date().toDateString()`).

---

## 6. Progress Tracking

### Step 1: Fetch and Plot History
- **Task**: Retrieve analysis history and plot scores over time.
- **Files**:
  - `src/screens/ProgressScreen.tsx`: Use `react-native-chart-kit` for line graph.
  - `src/lib/progress.ts`: Query `Analyses` table from Supabase, order by `createdAt`.
- **Dependencies**: Photo Upload and Analysis (Section 4), Routines (Section 5)
- **Instructions**: Test with mock data before connecting to Supabase.

### Step 2: Show Summary
- **Task**: Display improved features and overall progress percentage.
- **Files**:
  - `src/screens/ProgressScreen.tsx`: Add summary section below graph.
- **Dependencies**: Step 1
- **Instructions**: Calculate differences between first and latest scores.

---

## 7. Premium Features

### Step 1: Implement Free Use Logic
- **Task**: Allow one free analysis and routine, then restrict access.
- **Files**:
  - `src/navigation/navigation.ts`: Guard routes based on `freeUseConsumed`.
  - `src/lib/auth.ts`: Update `freeUseConsumed` after first use.
- **Dependencies**: All prior sections
- **Instructions**: Check `freeUseConsumed` before rendering restricted screens.

### Step 2: Add Premium Lock Screen
- **Task**: Show a teaser task and Stripe payment option.
- **Files**:
  - `src/screens/PremiumLockScreen.tsx`: Display teaser and "Unlock" button.
  - `src/lib/payments.ts`: Integrate Stripe checkout for subscriptions.
- **Dependencies**: Step 1
- **Instructions**: Use `stripe.paymentIntents.create` and test with Stripe sandbox.

---

## 8. Testing and Error Handling

### Step 1: Add Unit Tests
- **Task**: Write tests for core logic (score calculation, routine parsing).
- **Files**:
  - `src/lib/scoreCalculator.test.ts`: Test `calculateScore` with sample data.
  - `src/lib/routine.test.ts`: Verify task parsing from OpenAI.
- **Dependencies**: All features
- **Instructions**: Run `jest` to execute tests.

### Step 2: Implement E2E Tests
- **Task**: Test end-to-end flows (e.g., signup to routine generation).
- **Files**:
  - `e2e/photoUpload.test.js`: Simulate photo upload and check routine output.
- **Dependencies**: All features
- **Instructions**: Set up Detox and run `detox test`.

### Step 3: Set Up Sentry
- **Task**: Add global error logging with Sentry.
- **Files**:
  - `src/App.tsx`: Wrap app in `Sentry.ErrorBoundary`.
- **Dependencies**: Project Setup (Section 1)
- **Instructions**: Initialize Sentry with DSN from the dashboard.

---

## Summary
- **Approach**: Phased development starting with setup, followed by core features, premium functionality, and testing.
- **Key Considerations**:
  - Secure API keys in `expo-constants`.
  - Balance free and premium features with clear teasers.
  - Cache routines offline using AsyncStorage.
  - Optimize performance for image uploads and API calls.
  - Handle errors with modals and Sentry logging.

This plan ensures a structured build process for "Max Your Look," ready for implementation.