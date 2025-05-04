import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import { User, AtSign } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import PasswordInput from '@/components/PasswordInput';
import HeaderBar from '@/components/HeaderBar';
import PasswordRequirements from '@/components/PasswordRequirements';
import { SignUpSchema } from '@/utils/validation';

export default function SignUpScreen() {
  const router = useRouter();

  const handleSignUp = (values: any) => {
    console.log('Sign up with:', values);
    // In a real app, you would register the user here
    // For this demo, we'll navigate to the success screen
    setTimeout(() => {
      router.push('/success');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="Create Account" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSignUp}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View style={styles.formContainer}>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                error={errors.fullName}
                touched={touched.fullName}
                leftIcon={<User size={20} color={Colors.text.secondary} />}
              />
              
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
                placeholder="Create a password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
              />
              
              <PasswordRequirements password={values.password} />
              
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
              />
              
              <Button
                title="Create Account"
                onPress={handleSubmit}
                isLoading={isSubmitting}
                style={styles.createAccountButton}
              />
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
  createAccountButton: {
    marginTop: 24,
    marginBottom: 40,
  },
});