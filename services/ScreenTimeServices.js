// services/ScreenTimeService.js

/**
 * TOGGLE THIS VARIABLE TO SWITCH MODES
 * true  = Use Fake Data (Free / Dev Mode)
 * false = Use Real Apple API (Paid Mode - Requires Entitlement)
 */
const IS_MOCK_MODE = true; 

// Import the real library (It will be undefined in Mock Mode since we uninstalled it)
let DeviceActivity;
try {
  if (!IS_MOCK_MODE) {
    DeviceActivity = require('react-native-device-activity');
  }
} catch (e) {
  console.warn("Real Screen Time Library not found - forcing Mock Mode.");
}

// ==========================================
// THE MOCK IMPLEMENTATION (Fake API)
// ==========================================

const mockRequestAuthorization = async () => {
  console.log("🔒 MOCK: Requesting Apple Family Control access...");
  await new Promise(r => setTimeout(r, 1500)); // Fake 1.5s delay
  console.log("✅ MOCK: Access Granted!");
  return true; 
};

const mockGetBlockedApps = () => {
  return [
    { id: '1', name: 'Instagram', icon: '📸' },
    { id: '2', name: 'TikTok', icon: '🎵' },
    { id: '3', name: 'Snapchat', icon: '👻' },
  ];
};

const mockBlockApp = (appId) => {
  console.log(`🚫 MOCK: Blocking app with ID: ${appId}`);
  return true;
};

// ==========================================
// THE EXPORTED INTERFACE
// ==========================================

export const ScreenTime = {
  requestAuthorization: IS_MOCK_MODE ? mockRequestAuthorization : DeviceActivity.requestAuthorization,
  getBlockedApps: IS_MOCK_MODE ? mockGetBlockedApps : DeviceActivity.getSelection,
  blockApp: IS_MOCK_MODE ? mockBlockApp : DeviceActivity.setActivity,
};