import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import { AtSign } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';
import { ForgotPasswordSchema } from '@/utils/validation';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const handleSubmit = (values: any) => {
    console.log('Reset password for:', values.email);
    // In a real app, you would send a reset password email/SMS here
    // For this demo, we'll navigate to the OTP verification screen
    setTimeout(() => {
      router.push('/otp-verification');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="Forgot Password" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionTitle}>Reset your password</Text>
          <Text style={styles.instructionText}>
            Enter the email associated with your account and we'll send a verification code to reset your password.
          </Text>
        </View>
        
        <Formik
          initialValues={{ email: '' }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleSubmit}
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
              
              <Button
                title="Submit"
                onPress={handleSubmit}
                isLoading={isSubmitting}
                style={styles.submitButton}
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
  instructionContainer: {
    marginTop: 20,
    marginBottom: 24,
  },
  instructionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  instructionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 24,
  },
});