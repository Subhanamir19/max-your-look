import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

const { width } = Dimensions.get('window');

// Content for onboarding slides
const slides = [
  {
    id: '1',
    title: 'Welcome to Max Your Look!',
    text: 'Get a model-type face with AI technology.',
    iconText: '👤',
  },
  {
    id: '2',
    title: 'Snap a Photo, See Your Scores',
    text: 'Our AI analyzes your facial features and gives you detailed scores.',
    iconText: '📷',
  },
  {
    id: '3',
    title: 'Follow Your Daily Routine',
    text: 'Complete personalized tasks to enhance your features and look sharper.',
    iconText: '✅',
  },
  {
    id: '4',
    title: 'Track Your Progress',
    text: 'See your improvement over time. First try is free, then unlock premium!',
    iconText: '📈',
  },
];

const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderDots = () => {
    return slides.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          { backgroundColor: currentIndex === index ? COLORS.gold : COLORS.gray }
        ]}
      />
    ));
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      // On last slide, go to HomeScreen
      navigation.replace('Home');
    }
  };

  const handleSkip = () => {
    // Skip directly to HomeScreen
    navigation.replace('Home');
  };

  const renderSlide = ({ item }: { item: typeof slides[0] }) => {
    return (
      <View style={styles.slideContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{item.iconText}</Text>
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={handleSkip}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      
      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {renderDots()}
        </View>
        
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  skipButton: {
    position: 'absolute',
    top: SPACING.large,
    right: SPACING.large,
    zIndex: 1,
  },
  skipText: {
    color: COLORS.darkGray,
    fontSize: FONT_SIZES.body,
  },
  slideContainer: {
    width,
    padding: SPACING.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: SPACING.large,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  iconText: {
    fontSize: 70,
  },
  title: {
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  text: {
    fontSize: FONT_SIZES.body,
    color: COLORS.darkGray,
    textAlign: 'center',
    paddingHorizontal: SPACING.large,
  },
  footer: {
    padding: SPACING.large,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.large,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: COLORS.gold,
    padding: SPACING.medium,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen; 