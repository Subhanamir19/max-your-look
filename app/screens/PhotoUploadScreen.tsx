import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { useAnalysis } from '../contexts/AnalysisContext';

const PhotoUploadScreen = ({ navigation }: any) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { photoUri, setPhotoUri, setIsAnalyzing } = useAnalysis();

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status === 'granted') {
      takePhoto();
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      
      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      
      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const analyzePhoto = () => {
    if (photoUri) {
      setIsAnalyzing(true);
      // In a real app, you would upload the photo to your API here
      // For now, we'll just navigate to the analysis screen after a delay
      setTimeout(() => {
        setIsAnalyzing(false);
        navigation.navigate('Analysis');
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>Upload Your Photo</Text>
        <Text style={styles.subtitle}>
          Take a front-facing photo in good lighting
        </Text>
        
        <View style={styles.photoContainer}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photoPreview} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No photo selected</Text>
            </View>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={requestCameraPermission}
          >
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={pickImage}
          >
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>
          
          {photoUri && (
            <TouchableOpacity 
              style={[styles.button, styles.analyzeButton]}
              onPress={analyzePhoto}
            >
              <Text style={styles.buttonText}>Analyze Face</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.large,
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
    textAlign: 'center',
    marginBottom: SPACING.large,
  },
  photoContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: SPACING.large,
    backgroundColor: COLORS.lightGray,
  },
  placeholderImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.darkGray,
    fontSize: FONT_SIZES.body,
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: '100%',
    gap: SPACING.medium,
  },
  button: {
    backgroundColor: COLORS.gold,
    padding: SPACING.medium,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: COLORS.black,
  },
  analyzeButton: {
    backgroundColor: COLORS.gold,
    marginTop: SPACING.small,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
  },
});

export default PhotoUploadScreen; 