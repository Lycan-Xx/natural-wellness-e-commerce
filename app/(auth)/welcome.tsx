import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import GreenCartLogo from '@/components/GreenCartLogo';
import { Carrot, Truck, ChefHat } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/(auth)/signup');
  };

  const handleSignIn = () => {
    router.push('/(auth)/signin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.8)', Colors.background]}
        style={styles.gradient}
      />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <GreenCartLogo size="large" />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Healthy Eating{'\n'}Made Simple!</Text>

        </View>
        
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Carrot size={28} color={Colors.primary} style={{ marginBottom: 8 }} />
            <Text style={styles.featureText}>Fresh Produce</Text>
          </View>
          <View style={styles.featureItem}>
            <Truck size={28} color={Colors.primary} style={{ marginBottom: 8 }} />
            <Text style={styles.featureText}>Fast Delivery</Text>
          </View>
          <View style={styles.featureItem}>
            <ChefHat size={28} color={Colors.primary} style={{ marginBottom: 8 }} />
            <Text style={styles.featureText}>Easy Recipes</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Create an account"
            onPress={handleSignUp}
            style={styles.button}
          />
          <Button
            title="I Already Have an Account"
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 22,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 24,
  },
  featureItem: {
    alignItems: 'center',
    padding: 12,
  },
  featureEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 30,
  },
  button: {
    marginBottom: 16,
  },
});