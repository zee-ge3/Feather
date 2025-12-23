import { useRouter } from 'expo-router'; // This is how we navigate in Expo
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    // This is how you navigate to the main tabs after welcome
    router.push('/how-it-works');
  };

  return (
    <View style={styles.container}>
      {/* TASK 1: Import your Figma Image 
        Make sure the file exists in assets/images/
      */}
      <Image 
        source={require('@/assets/images/feather-logo-basic.png')} 
        style={styles.heroImage} 
      />

      {/* TASK 2: Add your Welcome Text */}
      <Text style={styles.title}>Flock Together</Text>
      <Text style={styles.subtitle}>
        Your friend's favorite productivity app. {"\n"} 
        Reclaim your focus. {"\n"}
        Stay connected, stay productive.
      </Text>

      {/* TASK 3: Style this button to match your Figma */}
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Next →</Text>
      </TouchableOpacity>
    </View>
  );
}

// TASK 4: Add your Figma styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heroImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain', // Keeps the image aspect ratio
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});