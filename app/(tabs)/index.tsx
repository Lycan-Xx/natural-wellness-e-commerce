import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Colors from '@/constants/Colors';
import GreenCartLogo from '@/components/GreenCartLogo';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <GreenCartLogo size="medium" />
        <Text style={styles.welcomeText}>Welcome to GreenCart</Text>
        <Text style={styles.subtitleText}>
          Your one-stop shop for fresh groceries
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: 8,
  },
});