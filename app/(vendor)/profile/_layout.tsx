import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen 
        name="edit"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom'
        }}
      />
      <Stack.Screen 
        name="address"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom'
        }}
      />
      <Stack.Screen 
        name="language"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom'
        }}
      />
      <Stack.Screen 
        name="payment"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom'
        }}
      />
    </Stack>
  );
}