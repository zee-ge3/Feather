import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
// If ScreenTimeServices.js is a plain JS file, drop the `.js` extension and tell TS to ignore missing types:
import { ScreenTime } from '../../services/ScreenTimeServices';

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [blockedApps, setBlockedApps] = useState<{ id: string; name: string; icon?: string }[]>([]);

  const handleSetup = async () => {
    try {
      await ScreenTime.requestAuthorization();
      setIsAuthorized(true);
      
      // Load "Fake" data
      const apps = ScreenTime.getBlockedApps();
      setBlockedApps(apps);
      
    } catch (error) {
      Alert.alert("Error", "Could not authorize screen time.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Screen Time Blocker (Beta)</Text>
      
      {!isAuthorized ? (
        <Button title="Grant Permissions" onPress={handleSetup} />
      ) : (
        <View style={styles.listContainer}>
          <Text style={styles.subHeader}>Currently Monitoring:</Text>
          <FlatList 
            data={blockedApps}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.appItem}>
                <Text style={styles.icon}>{item.icon}</Text>
                <Text style={styles.appName}>{item.name}</Text>
                <Button title="Block Now" color="red" onPress={() => ScreenTime.blockApp(item.id)} />
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, alignItems: 'center', backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subHeader: { fontSize: 18, marginBottom: 10, color: '#555' },
  listContainer: { width: '90%' },
  appItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    padding: 15, 
    marginBottom: 10, 
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: { fontSize: 30, marginRight: 15 },
  appName: { fontSize: 18, flex: 1, fontWeight: '600' }
});