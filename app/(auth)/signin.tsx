import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import { AtSign } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import PasswordInput from '@/components/PasswordInput';
import HeaderBar from '@/components/HeaderBar';
import CheckBox from '@/components/CheckBox';
import Divider from '@/components/Divider';
import SocialButton from '@/components/SocialButton';
import { SignInSchema } from '@/utils/validation';
import { useAuth } from '@/context/AuthContext';

// Import the provided images
const googleLogo = require('@/assets/google.png'); // Place your Google image in assets as google.png
const facebookLogo = require('@/assets/facebook.png'); // Place your Facebook image in assets as facebook.png

export default function SignInScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  
  const handleCreateAccount = () => {
    router.push('/(auth)/signup');
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  const handleSignIn = async (values: any) => {
    try {
      const user = await signIn(values.email, values.password);
      // Use more direct navigation with replacement
      if (user.role === 'vendor') {
        router.replace('/(vendor)');
      } else {
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google');
  };

  const handleFacebookSignIn = () => {
    console.log('Sign in with Facebook');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar 
        title="Sign In"
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={{ email: '', password: '', rememberMe: false }}
          validationSchema={SignInSchema}
          onSubmit={handleSignIn}
        >
          {({ 
            handleChange, 
            handleBlur, 
            handleSubmit, 
            values, 
            errors, 
            touched, 
            isSubmitting,
            setFieldValue
          }) => (
            <View style={styles.formContainer}>
              <Input
                label="Email"
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<AtSign size={20} color={Colors.text.secondary} />}
              />
              
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
              />
              
              <View style={styles.forgotPasswordRow}>
                <CheckBox
                  checked={values.rememberMe}
                  onPress={() => setFieldValue('rememberMe', !values.rememberMe)}
                  label="Remember me"
                />
                
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {error && <Text style={styles.errorText}>{error}</Text>}
              
              <Button
                title="Sign In"
                onPress={handleSubmit}
                isLoading={isSubmitting}
                style={styles.signInButton}
              />

              <TouchableOpacity
                onPress={handleCreateAccount}
                style={styles.createAccountLink}
                activeOpacity={0.8}
              >
                <Text style={styles.createAccountLinkText}>Create Account</Text>
              </TouchableOpacity>
              
              <Divider text="or continue with" />
              
              <View style={styles.socialButtonsContainer}>
                <SocialButton
                  icon={
                    <Image
                      source={googleLogo}
                      style={{ width: 24, height: 24 }}
                      resizeMode="contain"
                    />
                  }
                  onPress={handleGoogleSignIn}
                  accessibilityLabel="Sign in with Google"
                />
                <SocialButton
                  icon={
                    <Image
                      source={facebookLogo}
                      style={{ width: 24, height: 24 }}
                      resizeMode="contain"
                    />
                  }
                  onPress={handleFacebookSignIn}
                  accessibilityLabel="Sign in with Facebook"
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  forgotPasswordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  signInButton: {
    marginBottom: 16,
  },
  createAccountLink: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 4,
    backgroundColor: Colors.white,
  },
  createAccountLinkText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: Colors.primary,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
});