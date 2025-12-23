import { useIsFocused } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Alert, Button, StyleSheet, Text, Vibration, View } from 'react-native';

export default function ScannerTab() {
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const cameraLock = useRef(false);

  // blank if no permission
  if (!permission) {
    return <View />;
  }

  // ask for permission
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need camera access to unlock friends.</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // scan state
  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (cameraLock.current) return;
    cameraLock.current = true;
    if (scanned || !isFocused) return;
    else {
      setScanned(true);
      Vibration.vibrate();
      
      // this should change to another tab
      Alert.alert(
        "QR Code Found!",
        `You scanned: ${data}`,
        [
          { 
            text: "Unlock Friend", 
            onPress: () => {
              // Logic to unlock the friend goes here

              setScanned(false);
              setTimeout(() => {
                cameraLock.current = false;
              }, 1000); // prevent immediate re-scan
            }
          }
        ]
      );
    }
  };
  
  if (!isFocused) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      >
        <View style={styles.overlay}>
            <Text style={styles.overlayText}>Scan Friend's QR Code</Text>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  message: { textAlign: 'center', paddingBottom: 10 },
  camera: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});