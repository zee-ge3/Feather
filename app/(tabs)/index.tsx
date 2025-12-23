// This will change with ADP: Apple FamilyActivityPicker will replace app logic
import { useSession } from '@/context/SessionContext';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenTime } from '../../services/ScreenTimeServices';

// ------------------------------------------------------
// THE "JAIL" COMPONENT (Locked View)
// This remains the same after ADP
// ------------------------------------------------------
function LockedView({ onUnlock }: { onUnlock: () => void }) {
  // TODO: Add a real countdown timer later
  return (
    <View style={styles.lockedContainer}>
      <Text style={styles.lockedEmoji}>🔒</Text>
      <Text style={styles.lockedTitle}>Feather Enabled</Text>
      <Text style={styles.lockedSubtitle}>
        You can only unlock by scanning a friend's QR code.
      </Text>

      {/* Placeholder */}
      <View style={styles.timerBox}>
        <Text style={styles.timerText}>19:59</Text>
        <Text style={styles.timerLabel}>minutes remaining</Text>
      </View>

      <TouchableOpacity style={styles.unlockButton} onPress={onUnlock}>
        <Text style={styles.unlockButtonText}>Tap with a friend's phone</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const {isLocked, startLockSession, endLockSession} = useSession(); // We only need the function here
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [blockedApps, setBlockedApps] = useState<{ id: string; name: string; icon?: string }[]>([]);
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);

  // This will be replaced in swift
  useEffect(() => {
    const loadData = async () => {
      try {
        await ScreenTime.requestAuthorization();
        setIsAuthorized(true);
        const apps = ScreenTime.getBlockedApps();
        setBlockedApps(apps);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  // This will be replaced in swift
  const handleToggleApp = (appId: string) => {
    setSelectedAppIds((prevSelected) => {
      if (prevSelected.includes(appId)) {
        return prevSelected.filter((id) => id !== appId);
      } else {
        return [...prevSelected, appId];
      }
    });
  };

  const handleLock = () => {
    // 1. Actually lock the apps using the Service
    selectedAppIds.forEach(id => ScreenTime.blockApp(id));
    
    // 2. Tell the Context the session has started (e.g., for 20 minutes)
    startLockSession(20); 
  };

  if (isLocked) {
    return <LockedView onUnlock={endLockSession} />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Apps to Block</Text>
      
      <FlatList
        style={styles.list} // Added style to fill space
        contentContainerStyle={styles.listContent} // Adds padding inside the scroll
        data={blockedApps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedAppIds.includes(item.id);
          return (
            <TouchableOpacity 
              style={[
                styles.item, 
                isSelected && styles.itemSelected 
              ]} 
              onPress={() => handleToggleApp(item.id)}
            >
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.appName}>{item.name}</Text>
              {isSelected && <Text style={styles.checkMark}>✅</Text>}
            </TouchableOpacity>
          );
        }}
      />
      
      <View style={styles.footer}>
        <Text style={styles.stats}>
            {selectedAppIds.length} apps selected
        </Text>
        <Button 
            title="Lock Phone" 
            disabled={selectedAppIds.length === 0} 
            onPress={handleLock} // Connected the function
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60, // Push content down from top notch
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20,
    paddingHorizontal: 20, // Add side padding to header
  },
  list: {
    flex: 1, // Takes all available space
    width: '100%',
  },
  listContent: {
    paddingHorizontal: 20, // Adds spacing on sides of list items
    paddingBottom: 20,
  },
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f8f9fa', // Slightly grey background for cards
    padding: 16, 
    marginBottom: 12, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemSelected: {
    backgroundColor: '#e6fffa', // Light mint/green
    borderColor: '#38b2ac',     // Darker green border
  },
  icon: { 
    fontSize: 24, 
    marginRight: 16 
  },
  appName: { 
    fontSize: 16, 
    flex: 1, 
    fontWeight: '600',
    color: '#333'
  },
  checkMark: { 
    fontSize: 16 
  },
  footer:{
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff', // Ensure footer covers list behind it
  },
  stats:{
    marginBottom: 12,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  // Add these to your const styles = ...
  lockedContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Dark mode for "Jail"
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  lockedEmoji: { fontSize: 80, marginBottom: 20 },
  lockedTitle: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 10 
  },
  lockedSubtitle: { 
    fontSize: 16, 
    color: '#aaa', 
    textAlign: 'center', 
    marginBottom: 40 
  },
  timerBox: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  timerText: { fontSize: 48, fontWeight: 'bold', color: '#fff', fontVariant: ['tabular-nums'] },
  timerLabel: { fontSize: 14, color: '#888', textTransform: 'uppercase', letterSpacing: 2 },
  unlockButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  unlockButtonText: { fontSize: 18, fontWeight: 'bold', color: '#000' },
});