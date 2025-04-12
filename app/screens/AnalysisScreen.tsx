import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { useAnalysis } from '../contexts/AnalysisContext';

const AnalysisScreen = ({ navigation }: any) => {
  const { scores, isAnalyzing } = useAnalysis();

  // Mock scores for development (remove in production)
  const mockScores = {
    jawline: 70,
    skin: 85,
    eyebrows: 65,
    eyes: 78,
    nose: 82,
    lips: 76,
    hairline: 68,
    facialHarmony: 72,
    modelPercentage: 75,
  };

  // Use actual scores if available, otherwise use mock scores
  const displayScores = scores || mockScores;

  const renderScoreItem = (label: string, score: number) => {
    // Don't render the model percentage in the list
    if (label === 'modelPercentage') return null;
    
    // Convert camelCase to Title Case
    const formattedLabel = label
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
    
    return (
      <View style={styles.scoreItem} key={label}>
        <Text style={styles.scoreLabel}>{formattedLabel}</Text>
        <View style={styles.scoreBarContainer}>
          <View 
            style={[
              styles.scoreBar, 
              { width: `${score}%` },
              score < 60 ? styles.lowScore : 
              score < 80 ? styles.mediumScore : 
              styles.highScore
            ]} 
          />
        </View>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>
    );
  };

  if (isAnalyzing) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Analyzing your face...</Text>
          {/* Add a loading indicator here */}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Your Analysis Results</Text>
        
        <View style={styles.modelPercentageContainer}>
          <Text style={styles.modelPercentageLabel}>Model Look Percentage</Text>
          <Text style={styles.modelPercentageValue}>
            {displayScores.modelPercentage}%
          </Text>
          <View style={styles.modelPercentageBarContainer}>
            <View 
              style={[
                styles.modelPercentageBar, 
                { width: `${displayScores.modelPercentage}%` }
              ]} 
            />
          </View>
        </View>
        
        <View style={styles.scoresList}>
          <Text style={styles.scoresTitle}>Feature Scores</Text>
          {Object.entries(displayScores).map(([key, value]) => 
            renderScoreItem(key, value as number)
          )}
        </View>
        
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>What This Means</Text>
          <Text style={styles.explanationText}>
            These scores represent how your facial features compare to model-type features.
            A higher score means your feature is closer to the ideal model look.
            Follow your personalized routine to improve these scores over time.
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.routineButton}
          onPress={() => navigation.navigate('Routine')}
        >
          <Text style={styles.routineButtonText}>View My Routine</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    padding: SPACING.large,
  },
  title: {
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.large,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZES.heading,
    color: COLORS.gold,
    fontWeight: 'bold',
  },
  modelPercentageContainer: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    alignItems: 'center',
  },
  modelPercentageLabel: {
    fontSize: FONT_SIZES.body,
    color: COLORS.darkGray,
    marginBottom: SPACING.small,
  },
  modelPercentageValue: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.gold,
    marginBottom: SPACING.medium,
  },
  modelPercentageBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: COLORS.gray,
    borderRadius: 6,
    overflow: 'hidden',
  },
  modelPercentageBar: {
    height: '100%',
    backgroundColor: COLORS.gold,
  },
  scoresList: {
    marginBottom: SPACING.large,
  },
  scoresTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.medium,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  scoreLabel: {
    flex: 2,
    fontSize: FONT_SIZES.body,
    color: COLORS.black,
  },
  scoreBarContainer: {
    flex: 5,
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: SPACING.small,
  },
  scoreBar: {
    height: '100%',
    backgroundColor: COLORS.gold,
  },
  lowScore: {
    backgroundColor: COLORS.error,
  },
  mediumScore: {
    backgroundColor: COLORS.gold,
  },
  highScore: {
    backgroundColor: COLORS.success,
  },
  scoreValue: {
    flex: 1,
    fontSize: FONT_SIZES.body,
    color: COLORS.black,
    textAlign: 'right',
  },
  explanationContainer: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: SPACING.large,
    marginBottom: SPACING.large,
  },
  explanationTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.small,
  },
  explanationText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.darkGray,
    lineHeight: 24,
  },
  routineButton: {
    backgroundColor: COLORS.gold,
    padding: SPACING.medium,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: SPACING.large,
  },
  routineButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
  },
});

export default AnalysisScreen; 