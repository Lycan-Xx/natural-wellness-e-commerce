import { Stack } from 'expo-router';

export default function VendorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="products" />
      <Stack.Screen name="orders" />
    </Stack>
  );
}