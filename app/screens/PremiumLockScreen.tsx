import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

// In a real app, this would integrate with Stripe or another payment provider
const handleUnlockPremium = () => {
  // Navigate to payment flow or show payment modal
  console.log('Premium unlock requested');
};

const PremiumLockScreen = ({ navigation }: any) => {
  // Teaser task - in a real app, this would be the first task from the locked routine
  const teaserTask = 'Mew for 10 minutes to improve jawline definition';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>Unlock Premium</Text>
        
        <View style={styles.glowContainer}>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>PRO</Text>
          </View>
        </View>
        
        <Text style={styles.subtitle}>
          Take your look to the next level with premium features
        </Text>
        
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Premium Includes:</Text>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Unlimited facial analyses</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Personalized daily routines</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Progress tracking and graphs</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Monthly improvement reports</Text>
          </View>
        </View>
        
        <View style={styles.teaserContainer}>
          <Text style={styles.teaserTitle}>Today's Task Preview:</Text>
          <Text style={styles.teaserText}>{teaserTask}</Text>
          <Text style={styles.teaserSubtext}>
            Unlock premium to access your full daily routine
          </Text>
        </View>
        
        <View style={styles.pricingContainer}>
          <Text style={styles.pricingText}>
            <Text style={styles.priceHighlight}>$4.99</Text> per month
          </Text>
          <Text style={styles.pricingSubtext}>
            Cancel anytime. 7-day free trial available.
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.unlockButton}
          onPress={handleUnlockPremium}
        >
          <Text style={styles.unlockButtonText}>Unlock Premium</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Not Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.large,
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.gold,
    marginBottom: SPACING.medium,
  },
  glowContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.large,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 10,
  },
  premiumBadge: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.black,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadgeText: {
    color: COLORS.gold,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: FONT_SIZES.body,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.large,
  },
  featuresContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: SPACING.large,
    marginBottom: SPACING.large,
  },
  featuresTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.medium,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  featureIcon: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    marginRight: SPACING.small,
  },
  featureText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.white,
  },
  teaserContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 12,
    padding: SPACING.large,
    marginBottom: SPACING.large,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  teaserTitle: {
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    color: COLORS.gold,
    marginBottom: SPACING.small,
  },
  teaserText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.white,
    marginBottom: SPACING.small,
  },
  teaserSubtext: {
    fontSize: FONT_SIZES.small,
    color: 'rgba(255, 255, 255, 0.7)',
    fontStyle: 'italic',
  },
  pricingContainer: {
    marginBottom: SPACING.large,
    alignItems: 'center',
  },
  pricingText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.white,
    marginBottom: SPACING.tiny,
  },
  priceHighlight: {
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    color: COLORS.gold,
  },
  pricingSubtext: {
    fontSize: FONT_SIZES.small,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  unlockButton: {
    width: '100%',
    backgroundColor: COLORS.gold,
    padding: SPACING.medium,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  unlockButtonText: {
    color: COLORS.black,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
  },
  backButton: {
    width: '100%',
    padding: SPACING.small,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: FONT_SIZES.body,
  },
});

export default PremiumLockScreen; 