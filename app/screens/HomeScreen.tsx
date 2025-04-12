import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Max Your Look</Text>
          <Text style={styles.subtitle}>
            Enhance your facial features with AI analysis
          </Text>
        </View>
        
        <View style={styles.mainActionContainer}>
          <TouchableOpacity 
            style={styles.mainButton}
            onPress={() => navigation.navigate('PhotoUpload')}
          >
            <Text style={styles.mainButtonText}>Take Photo</Text>
            <Text style={styles.mainButtonSubtext}>
              Upload a photo to analyze your facial features
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>My Journey</Text>
        </View>
        
        <View style={styles.cardContainer}>
          <TouchableOpacity 
            style={[styles.card, styles.analysisCard]}
            onPress={() => navigation.navigate('Analysis')}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>My Analysis</Text>
              <Text style={styles.cardDescription}>
                See your scores for jawline, skin, and other features
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.card, styles.routineCard]}
            onPress={() => navigation.navigate('Routine')}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Daily Routine</Text>
              <Text style={styles.cardDescription}>
                Follow your personalized tasks to improve your look
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.card, styles.progressCard]}
            onPress={() => navigation.navigate('Progress')}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>My Progress</Text>
              <Text style={styles.cardDescription}>
                Track improvement in your scores over time
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.card, styles.premiumCard]}
            onPress={() => navigation.navigate('PremiumLock')}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Premium Features</Text>
              <Text style={styles.cardDescription}>
                Unlock unlimited analyses and personalized routines
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
    flexGrow: 1,
    padding: SPACING.large,
  },
  header: {
    marginBottom: SPACING.large,
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.small,
  },
  subtitle: {
    fontSize: FONT_SIZES.body,
    color: COLORS.darkGray,
  },
  mainActionContainer: {
    marginBottom: SPACING.large,
  },
  mainButton: {
    backgroundColor: COLORS.gold,
    padding: SPACING.large,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    marginBottom: SPACING.tiny,
  },
  mainButtonSubtext: {
    color: COLORS.white,
    fontSize: FONT_SIZES.small,
    opacity: 0.9,
  },
  sectionTitle: {
    marginBottom: SPACING.medium,
  },
  sectionTitleText: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: SPACING.medium,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  cardContent: {
    padding: SPACING.medium,
  },
  cardTitle: {
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.tiny,
  },
  cardDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.darkGray,
  },
  analysisCard: {
    borderTopWidth: 3,
    borderTopColor: COLORS.gold,
  },
  routineCard: {
    borderTopWidth: 3,
    borderTopColor: '#4CD964', // Success green
  },
  progressCard: {
    borderTopWidth: 3,
    borderTopColor: '#5AC8FA', // Blue
  },
  premiumCard: {
    borderTopWidth: 3,
    borderTopColor: COLORS.black,
  },
});

export default HomeScreen; 