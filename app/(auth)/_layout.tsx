import { Stack, SplashScreen, Redirect } from 'expo-router';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AuthLayout() {
  // Redirect to welcome screen by default
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#F8F9FA' },
          ...Platform.select({
            web: {
              animation: 'default',
            },
            default: {
              animation: 'slide_from_right',
            },
          }),
        }}
      >
        <Stack.Screen 
          name="index" 
          redirect={true}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
        <Stack.Screen 
          name="forgot-password" 
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="otp-verification" />
        <Stack.Screen name="new-password" />
        <Stack.Screen 
          name="success" 
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}