import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';
import OTPInput from '@/components/OTPInput';
import { OTPVerificationSchema } from '@/utils/validation';

export default function OTPVerificationScreen() {
  const router = useRouter();
  const [counter, setCounter] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [counter]);

  const handleResendOTP = () => {
    if (canResend) {
      // Reset counter
      setCounter(60);
      setCanResend(false);
      
      // In a real app, you would call an API to resend OTP
      console.log('Resending OTP');
    }
  };

  const handleVerifyOTP = (values: any) => {
    console.log('Verifying OTP:', values.otp);
    // In a real app, you would verify the OTP here
    // For this demo, we'll navigate to the new password screen
    setTimeout(() => {
      router.push('/new-password');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="OTP Verification" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionTitle}>Verification code</Text>
          <Text style={styles.instructionText}>
            We have sent a verification code to your email. Please enter the code below to verify.
          </Text>
        </View>
        
        <Formik
          initialValues={{ otp: '' }}
          validationSchema={OTPVerificationSchema}
          onSubmit={handleVerifyOTP}
        >
          {({
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
          }) => (
            <View style={styles.formContainer}>
              <OTPInput
                otpLength={4}
                value={values.otp}
                onChange={(otp) => setFieldValue('otp', otp)}
              />
              
              {touched.otp && errors.otp ? (
                <Text style={styles.errorText}>{errors.otp}</Text>
              ) : null}
              
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>
                  Didn't receive the code?{' '}
                </Text>
                <TouchableOpacity
                  onPress={handleResendOTP}
                  disabled={!canResend}
                >
                  <Text
                    style={[
                      styles.resendActionText,
                      !canResend && styles.disabledText,
                    ]}
                  >
                    {canResend ? 'Resend' : `Resend in ${counter}s`}
                  </Text>
                </TouchableOpacity>
              </View>
              
              <Button
                title="Verify"
                onPress={handleSubmit}
                isLoading={isSubmitting}
                style={styles.verifyButton}
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
    alignItems: 'center',
    marginBottom: 20,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 24,
  },
  resendText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  resendActionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  disabledText: {
    color: Colors.text.tertiary,
  },
  verifyButton: {
    width: '100%',
  },
});