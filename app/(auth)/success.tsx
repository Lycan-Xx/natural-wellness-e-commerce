import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import Colors from '@/constants/Colors';

export default function SuccessScreen() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to main app after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LottieView
          source={{
            uri: 'https://assets1.lottiefiles.com/packages/lf20_swnrn2hg.json',
          }}
          style={styles.animation}
          autoPlay
          loop={false}
        />
        
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.subtitle}>
          You've successfully signed in to GreenCart
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 8,
    textAlign: 'center',
  },
});