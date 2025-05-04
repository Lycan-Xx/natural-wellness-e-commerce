import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import { Mail, AtSign, Facebook } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import PasswordInput from '@/components/PasswordInput';
import HeaderBar from '@/components/HeaderBar';
import CheckBox from '@/components/CheckBox';
import Divider from '@/components/Divider';
import SocialButton from '@/components/SocialButton';
import { SignInSchema } from '@/utils/validation';

export default function SignInScreen() {
  const router = useRouter();
  
  const handleCreateAccount = () => {
    router.push('/signup');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleSignIn = (values: any) => {
    console.log('Sign in with:', values);
    // In a real app, you would authenticate the user here
    // For this demo, we'll navigate to the main app
    setTimeout(() => {
      router.push('/success');
    }, 1000);
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
        rightComponent={
          <TouchableOpacity onPress={handleCreateAccount}>
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>
        }
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
              
              <Button
                title="Sign In"
                onPress={handleSubmit}
                isLoading={isSubmitting}
                style={styles.signInButton}
              />
              
              <Divider text="or continue with" />
              
              <View style={styles.socialButtonsContainer}>
                <SocialButton
                  icon={<Mail size={24} color={Colors.text.primary} />}
                  onPress={handleGoogleSignIn}
                  accessibilityLabel="Sign in with Google"
                />
                <SocialButton
                  icon={<Facebook size={24} color="#1877F2" />}
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
  createAccountText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary,
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
  signInButton: {
    marginBottom: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
});