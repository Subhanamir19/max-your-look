import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { useAnalysis } from '../contexts/AnalysisContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Circular progress component
const CircularProgress = ({ 
  size, 
  width = 8, 
  tintColor, 
  value, 
  backgroundColor = 'rgba(0, 0, 0, 0.1)' 
}) => {
  // Calculate the circumference
  const radius = (size - width) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the dash offset based on the value (0-10 scale)
  const maxValue = 10;
  const percentage = value / maxValue;
  const dashOffset = circumference * (1 - percentage);

  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      {/* Background circle */}
      <View style={[
        styles.circleBackground, 
        { 
          width: size, 
          height: size, 
          borderRadius: size / 2,
          borderWidth: width,
          borderColor: backgroundColor 
        }
      ]} />
      
      {/* Foreground circle (progress) */}
      <View style={[
        styles.circleForeground,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: width,
          borderColor: tintColor,
          strokeDasharray: circumference,
          strokeDashoffset: dashOffset,
          transform: [{ rotateZ: '-90deg' }]
        }
      ]} />
      
      {/* Value in center */}
      <View style={styles.circleTextContainer}>
        <Text style={[styles.circleText, { fontSize: size / 4 }]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const MainDashboardScreen = ({ navigation }) => {
  // Mock metrics
  const metrics = {
    overallLook: 7.2,
    potential: 8.4,
    masculinity: 6.9
  };
  
  // Get routines from context
  const { routines } = useAnalysis();
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  
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
  
  // Toggle task completion
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
  
  // Mock routines if not available from context
  const displayRoutines = routines || [
    'Chew mastic gum',
    'Do chin exercises',
    'Apply moisturizer',
    'Work out'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Max Your Look</Text>
        
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          {/* Using a View with backgroundColor as a placeholder */}
          <View style={styles.placeholderImage} />
        </View>
        
        {/* Metrics Section */}
        <Text style={styles.sectionTitle}>Your Look Metrics</Text>
        <View style={styles.metricsContainer}>
          <View style={styles.metricItem}>
            <CircularProgress 
              size={100} 
              width={8} 
              value={metrics.overallLook} 
              tintColor="#40e0d0" // Turquoise
            />
            <Text style={styles.metricLabel}>Overall Look</Text>
          </View>
          
          <View style={styles.metricItem}>
            <CircularProgress 
              size={100} 
              width={8} 
              value={metrics.potential} 
              tintColor="#40e0d0" // Turquoise
            />
            <Text style={styles.metricLabel}>Potential</Text>
          </View>
          
          <View style={styles.metricItem}>
            <CircularProgress 
              size={100} 
              width={8} 
              value={metrics.masculinity} 
              tintColor="#FFA500" // Orange
            />
            <Text style={styles.metricLabel}>Masculinity</Text>
          </View>
        </View>
        
        {/* To-Do List */}
        <View style={styles.todoContainer}>
          <Text style={styles.todoTitle}>Daily To-Do List</Text>
          <Text style={styles.todoSubtitle}>
            Follow your daily routine to improve your features
          </Text>
          
          {/* Task List */}
          {displayRoutines.map((task, index) => {
            const isCompleted = completedTasks.includes(index);
            
            return (
              <TouchableOpacity 
                key={`task-${index}`}
                style={styles.taskItem}
                onPress={() => toggleTaskCompletion(index)}
              >
                <View style={[
                  styles.checkbox, 
                  isCompleted && styles.checkedBox
                ]}>
                  {isCompleted && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[
                  styles.taskText,
                  isCompleted && styles.completedTaskText
                ]}>
                  {task}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      
      {/* Bottom Tab Navigation Placeholder */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIconActive}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Progress')}
        >
          <Text style={styles.tabIcon}>📊</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('PhotoUpload')}
        >
          <Text style={styles.tabIcon}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    padding: SPACING.large,
    paddingBottom: 80, // Account for tab bar
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.medium,
  },
  profileImageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: SPACING.large,
    backgroundColor: '#444',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.medium,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.large,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: FONT_SIZES.body,
    color: COLORS.white,
    marginTop: SPACING.small,
  },
  circleBackground: {
    position: 'absolute',
  },
  circleForeground: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  circleTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  todoContainer: {
    marginBottom: SPACING.large,
  },
  todoTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.tiny,
  },
  todoSubtitle: {
    fontSize: FONT_SIZES.body,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: SPACING.medium,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.white,
    marginRight: SPACING.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: COLORS.white,
  },
  checkmark: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
    fontSize: FONT_SIZES.body,
    color: COLORS.white,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 24,
    opacity: 0.6,
  },
  tabIconActive: {
    fontSize: 24,
    opacity: 1,
  },
});

export default MainDashboardScreen; 