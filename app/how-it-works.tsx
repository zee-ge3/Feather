import { useRouter } from 'expo-router'; // This is how we navigate in Expo
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FeatureScreen() {
  const router = useRouter();

  const handleNext = () => {
    // This is how you navigate to the main tabs after welcome
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
 
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.mainTitle}>How it works</Text>
        <Text style={styles.mainSubtitle}>Three steps to freedom.</Text>
      </View>

      {/* Feature List Section */}
      <View style={styles.featureList}>
        
        {/* Feature 1 */}
        <View style={styles.featureItem}>
          <Text style={styles.icon}>🚫</Text>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Block Distractions</Text>
            <Text style={styles.subtitle}>
              Choose which apps to block during your focus sessions.
            </Text>
          </View>
        </View>

        {/* Feature 2 */}
        <View style={styles.featureItem}>
          <Text style={styles.icon}>🤝</Text>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Physical Unlock</Text>
            <Text style={styles.subtitle}>
              The only way to unlock? Tap your friend's phone.
            </Text>
          </View>
        </View>

        {/* Feature 3 */}
        <View style={styles.featureItem}>
          <Text style={styles.icon}>🔥</Text>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Stay Focused</Text>
            <Text style={styles.subtitle}>
              Focus together with friends and keep each other accountable.
            </Text>
          </View>
        </View>

      </View>

      {/* TASK 3: Style this button to match your Figma */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

// Figma styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between', // Pushes button to bottom
  },
  header: {
    marginBottom: 20,
    alignItems: 'center', // Keep the main header centered
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
    marginBottom: 8,
  },
  mainSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  featureList: {
    flex: 1,
    justifyContent: 'center', // Centers the list vertically
  },
  featureItem: {
    flexDirection: 'row', // Puts icon next to text
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 30,
    marginRight: 15,
    marginTop: 2, // Slight adjustment to align with text top
  },
  textContainer: {
    flex: 1, // Takes up remaining space
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: '#000',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 18,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});