import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { useAnalysis } from '../contexts/AnalysisContext';

// Note: In a real app, you would use a charting library like react-native-chart-kit
// For this example, we'll create a simplified chart component

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - (SPACING.large * 2);
const CHART_HEIGHT = 200;
const CHART_PADDING = 20;

// Mock progress data
const mockProgressData = {
  dates: ['Month 1', 'Month 2', 'Month 3'],
  features: {
    jawline: [70, 75, 80],
    skin: [85, 88, 90],
    eyebrows: [65, 70, 72],
    eyes: [78, 80, 82],
    nose: [82, 82, 84],
    lips: [76, 78, 80],
    hairline: [68, 72, 75],
    facialHarmony: [72, 75, 80]
  },
  modelPercentage: [75, 78, 82]
};

interface ChartProps {
  data: number[];
  labels: string[];
  color: string;
  title: string;
}

const SimpleLineChart = ({ data, labels, color, title }: ChartProps) => {
  if (!data || data.length === 0) return null;
  
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  const effectiveHeight = CHART_HEIGHT - (CHART_PADDING * 2);
  
  const getY = (value: number) => {
    return CHART_HEIGHT - CHART_PADDING - ((value - minValue) / (range || 1)) * effectiveHeight;
  };
  
  const pointWidth = CHART_WIDTH / (data.length - 1);
  
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <View style={styles.chart}>
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          <Text style={styles.axisLabel}>{maxValue}</Text>
          <Text style={styles.axisLabel}>{Math.round((maxValue + minValue) / 2)}</Text>
          <Text style={styles.axisLabel}>{minValue}</Text>
        </View>
        
        {/* Chart area */}
        <View style={styles.chartArea}>
          {/* Draw horizontal grid lines */}
          <View style={[styles.gridLine, { top: getY(maxValue) }]} />
          <View style={[styles.gridLine, { top: getY((maxValue + minValue) / 2) }]} />
          <View style={[styles.gridLine, { top: getY(minValue) }]} />
          
          {/* Connect the data points with lines */}
          <View style={styles.lineContainer}>
            {data.map((value, index) => {
              if (index === 0) return null;
              
              const prevValue = data[index - 1];
              const startX = (index - 1) * pointWidth;
              const endX = index * pointWidth;
              const startY = getY(prevValue);
              const endY = getY(value);
              
              // Calculate line angle
              const angle = Math.atan2(endY - startY, endX - startX);
              const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
              
              return (
                <View
                  key={`line-${index}`}
                  style={[
                    styles.line,
                    {
                      left: startX,
                      top: startY,
                      width: length,
                      transform: [
                        { rotate: `${angle}rad` },
                        { translateY: -1 } // Half of line height for centering
                      ],
                      backgroundColor: color
                    }
                  ]}
                />
              );
            })}
          </View>
          
          {/* Data points */}
          {data.map((value, index) => (
            <View
              key={`point-${index}`}
              style={[
                styles.dataPoint,
                {
                  left: index * pointWidth - 4, // Half of point width for centering
                  top: getY(value) - 4, // Half of point height for centering
                  backgroundColor: color
                }
              ]}
            />
          ))}
        </View>
      </View>
      
      {/* X-axis labels */}
      <View style={styles.xAxis}>
        {labels.map((label, index) => (
          <Text 
            key={`label-${index}`} 
            style={[
              styles.axisLabel,
              { width: pointWidth, left: index * pointWidth - (pointWidth / 2) }
            ]}
          >
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const ProgressScreen = () => {
  // In a real app, you would fetch progress data from Supabase or AsyncStorage
  const progressData = mockProgressData;

  // Calculate improvements for each feature
  const calculateImprovements = () => {
    const improvements: Record<string, number> = {};
    
    Object.keys(progressData.features).forEach(feature => {
      const values = progressData.features[feature as keyof typeof progressData.features];
      if (values.length >= 2) {
        const firstValue = values[0];
        const lastValue = values[values.length - 1];
        improvements[feature] = lastValue - firstValue;
      }
    });
    
    return improvements;
  };
  
  const improvements = calculateImprovements();
  const modelPercentageImprovement = progressData.modelPercentage.length >= 2 
    ? progressData.modelPercentage[progressData.modelPercentage.length - 1] - progressData.modelPercentage[0]
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Your Progress</Text>
        
        {/* Model Percentage Chart */}
        <SimpleLineChart
          data={progressData.modelPercentage}
          labels={progressData.dates}
          color={COLORS.gold}
          title="Model Look Percentage"
        />
        
        {/* Feature Charts - Just show a couple of key features */}
        <SimpleLineChart
          data={progressData.features.jawline}
          labels={progressData.dates}
          color="#4CD964" // Success green
          title="Jawline Score"
        />
        
        <SimpleLineChart
          data={progressData.features.skin}
          labels={progressData.dates}
          color="#5AC8FA" // Blue
          title="Skin Score"
        />
        
        {/* Improvements Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Improvements Summary</Text>
          
          <View style={styles.modelImprovement}>
            <Text style={styles.modelImprovementLabel}>Model Look</Text>
            <Text style={styles.modelImprovementValue}>
              +{modelPercentageImprovement}%
            </Text>
          </View>
          
          <View style={styles.featureList}>
            {Object.entries(improvements).map(([feature, value]) => {
              // Skip if no improvement or negative
              if (value <= 0) return null;
              
              // Convert camelCase to Title Case
              const formattedFeature = feature
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase());
              
              return (
                <View key={feature} style={styles.featureItem}>
                  <Text style={styles.featureLabel}>{formattedFeature}</Text>
                  <Text style={[
                    styles.featureValue,
                    value > 5 ? styles.significantImprovement : styles.moderateImprovement
                  ]}>
                    +{value} points
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        
        {/* Motivation Message */}
        <View style={styles.motivationContainer}>
          <Text style={styles.motivationTitle}>Keep Going!</Text>
          <Text style={styles.motivationText}>
            You're making great progress! Continue following your daily routine
            to see even better results next month.
          </Text>
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
    padding: SPACING.large,
  },
  title: {
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.large,
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: SPACING.large,
  },
  chartTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.small,
  },
  chart: {
    flexDirection: 'row',
    height: CHART_HEIGHT,
  },
  yAxis: {
    width: 40,
    height: CHART_HEIGHT,
    justifyContent: 'space-between',
    paddingVertical: CHART_PADDING,
  },
  axisLabel: {
    fontSize: FONT_SIZES.small,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  chartArea: {
    flex: 1,
    height: CHART_HEIGHT,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  lineContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  line: {
    position: 'absolute',
    height: 2,
    backgroundColor: COLORS.gold,
    borderRadius: 1,
    transformOrigin: 'left center',
  },
  dataPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gold,
  },
  xAxis: {
    height: 30,
    flexDirection: 'row',
    position: 'relative',
  },
  summaryContainer: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: SPACING.large,
    marginBottom: SPACING.large,
  },
  summaryTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.medium,
  },
  modelImprovement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.medium,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: SPACING.medium,
  },
  modelImprovementLabel: {
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  modelImprovementValue: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.gold,
  },
  featureList: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    overflow: 'hidden',
  },
  featureItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  featureLabel: {
    fontSize: FONT_SIZES.body,
    color: COLORS.black,
  },
  featureValue: {
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
  },
  moderateImprovement: {
    color: '#4CD964', // Success green
  },
  significantImprovement: {
    color: COLORS.gold,
  },
  motivationContainer: {
    padding: SPACING.large,
    backgroundColor: COLORS.black,
    borderRadius: 12,
    marginBottom: SPACING.large,
  },
  motivationTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.gold,
    marginBottom: SPACING.small,
  },
  motivationText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.white,
    lineHeight: 24,
  },
});

export default ProgressScreen; 