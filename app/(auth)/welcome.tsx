import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import GreenCartLogo from '@/components/GreenCartLogo';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleSignIn = () => {
    router.push('/signin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <GreenCartLogo size="large" />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome to GreenCart</Text>
          <Text style={styles.subtitleText}>
            Your one-stop shop for fresh groceries
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Create Account" 
            onPress={handleSignUp} 
            style={styles.button}
          />
          <Button 
            title="Sign In" 
            onPress={handleSignIn} 
            variant="outline"
            style={styles.button}
          />
        </View>
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
    justifyContent: 'space-between',
    padding: 20,
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 40,
  },
  button: {
    marginBottom: 16,
  },
});