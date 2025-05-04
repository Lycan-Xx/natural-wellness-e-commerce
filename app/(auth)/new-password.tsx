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
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import PasswordInput from '@/components/PasswordInput';
import HeaderBar from '@/components/HeaderBar';
import PasswordRequirements from '@/components/PasswordRequirements';
import { NewPasswordSchema } from '@/utils/validation';

export default function NewPasswordScreen() {
  const router = useRouter();

  const handleSetNewPassword = (values: any) => {
    console.log('New password set:', values.password);
    // In a real app, you would update the user's password here
    // For this demo, we'll navigate to the success screen
    setTimeout(() => {
      router.push('/success');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="New Password" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionTitle}>Create new password</Text>
          <Text style={styles.instructionText}>
            Your new password must be different from previous used passwords.
          </Text>
        </View>
        
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validationSchema={NewPasswordSchema}
          onSubmit={handleSetNewPassword}
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
              <PasswordInput
                label="New Password"
                placeholder="Enter new password"
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
                title="Set New Password"
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