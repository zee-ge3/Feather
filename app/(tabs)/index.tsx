import { Redirect } from 'expo-router';

export default function Index() {
  // Temporary: Force the app to open the Welcome screen first
  return <Redirect href="/welcome" />;
}