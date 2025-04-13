import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { useAnalysis } from '../contexts/AnalysisContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock routine data - in a real app this would come from OpenAI based on the scores
const mockRoutines = [
  'Mew for 10 minutes each day to improve jawline definition',
  'Apply vitamin C serum morning and night for improved skin clarity',
  'Practice facial exercises focusing on eye area to reduce puffiness',
  'Use castor oil on eyebrows nightly to promote growth and definition',
  'Follow a water intake schedule of at least 2 liters daily for skin hydration'
];

const RoutineScreen = ({ navigation }) => {
  const { scores, routines, setRoutines } = useAnalysis();
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with mock data or fetch from API
  useEffect(() => {
    const loadRoutines = async () => {
      setIsLoading(true);
      try {
        // First check if we have cached routines
        const cachedRoutines = await AsyncStorage.getItem('routines');
        
        if (cachedRoutines) {
          setRoutines(JSON.parse(cachedRoutines));
        } else if (!routines) {
          // In a real app, you would generate routines based on scores with OpenAI here
          // For now, use mock data
          setRoutines(mockRoutines);
          // Cache the routines
          await AsyncStorage.setItem('routines', JSON.stringify(mockRoutines));
        }
      } catch (error) {
        console.error('Error loading routines:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoutines();
  }, [scores, routines, setRoutines]);

  // Load completed tasks from storage
  useEffect(() => {
    const loadCompletedTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('completedTasks');
        if (savedTasks) {
          setCompletedTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error('Error loading completed tasks:', error);
      }
    };

    loadCompletedTasks();
  }, []);

  const toggleTaskCompletion = async (index: number) => {
    try {
      let newCompletedTasks;
      
      if (completedTasks.includes(index)) {
        // Remove from completed tasks
        newCompletedTasks = completedTasks.filter(taskIndex => taskIndex !== index);
      } else {
        // Add to completed tasks
        newCompletedTasks = [...completedTasks, index];
      }
      
      setCompletedTasks(newCompletedTasks);
      await AsyncStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks));
    } catch (error) {
      console.error('Error saving task completion:', error);
    }
  };

  const renderRoutineItem = ({ item, index }: { item: string; index: number }) => {
    const isCompleted = completedTasks.includes(index);
    
    return (
      <TouchableOpacity 
        style={[styles.taskItem, isCompleted && styles.completedTask]}
        onPress={() => toggleTaskCompletion(index)}
      >
        <View style={[styles.checkbox, isCompleted && styles.checkedBox]}>
          {isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text 
          style={[styles.taskText, isCompleted && styles.completedTaskText]}
          numberOfLines={2}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Your Daily Routine</Text>
        <Text style={styles.subtitle}>
          Complete these tasks daily to improve your look
        </Text>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Generating your routine...</Text>
        </View>
      ) : routines && routines.length > 0 ? (
        <>
          <FlatList
            data={routines}
            renderItem={renderRoutineItem}
            keyExtractor={(_, index) => `routine-${index}`}
            contentContainerStyle={styles.routinesList}
          />
          
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {completedTasks.length}/{routines?.length || 0} Tasks Completed
            </Text>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    width: `${routines?.length ? 
                      (completedTasks.length / routines.length) * 100 : 0}%` 
                  }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>Pro Tip</Text>
            <Text style={styles.tipText}>
              Consistency is key! Complete these tasks daily for best results.
              You'll see improvements in your scores within weeks.
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.dashboardButton}
            onPress={() => navigation.navigate('MainDashboard')}
          >
            <Text style={styles.dashboardButtonText}>Continue to Main Dashboard</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No routines available yet.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SPACING.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.small,
  },
  subtitle: {
    fontSize: FONT_SIZES.body,
    color: COLORS.darkGray,
  },
  routinesList: {
    padding: SPACING.large,
    flexGrow: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.medium,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginBottom: SPACING.medium,
  },
  completedTask: {
    opacity: 0.7,
    backgroundColor: COLORS.lightGray,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.gold,
    marginRight: SPACING.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: COLORS.gold,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
    fontSize: FONT_SIZES.body,
    color: COLORS.black,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: COLORS.darkGray,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.darkGray,
  },
  progressContainer: {
    padding: SPACING.large,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  progressText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.black,
    marginBottom: SPACING.small,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.gold,
  },
  tipContainer: {
    margin: SPACING.large,
    padding: SPACING.large,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
  },
  tipTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.small,
  },
  tipText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.darkGray,
    lineHeight: 22,
  },
  dashboardButton: {
    margin: SPACING.large,
    backgroundColor: COLORS.gold,
    padding: SPACING.medium,
    borderRadius: 8,
    alignItems: 'center',
  },
  dashboardButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
  },
});

export default RoutineScreen; 