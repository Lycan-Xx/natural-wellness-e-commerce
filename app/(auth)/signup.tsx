import React, { useState } from 'react';
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
import { User, AtSign } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import PasswordInput from '@/components/PasswordInput';
import HeaderBar from '@/components/HeaderBar';
import PasswordRequirements from '@/components/PasswordRequirements';
import { SignUpSchema } from '@/utils/validation';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/user';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (values: any) => {
    try {
      await signUp(values.email, values.password, values.fullName, values.role);
      if (values.role === 'vendor') {
        router.replace('/(vendor)');
      } else {
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err.message);
    }
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
            role: 'customer' as UserRole,
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
            setFieldValue,
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

              <View style={styles.roleContainer}>
                <Text style={styles.roleLabel}>I want to:</Text>
                <View style={styles.roleOptions}>
                  <TouchableOpacity
                    style={[
                      styles.roleOption,
                      values.role === 'customer' && styles.roleOptionSelected,
                    ]}
                    onPress={() => setFieldValue('role', 'customer')}
                  >
                    <Text
                      style={[
                        styles.roleText,
                        values.role === 'customer' && styles.roleTextSelected,
                      ]}
                    >
                      Shop Products
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.roleOption,
                      values.role === 'vendor' && styles.roleOptionSelected,
                    ]}
                    onPress={() => setFieldValue('role', 'vendor')}
                  >
                    <Text
                      style={[
                        styles.roleText,
                        values.role === 'vendor' && styles.roleTextSelected,
                      ]}
                    >
                      Sell Products
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {error && <Text style={styles.errorText}>{error}</Text>}
              
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
  roleContainer: {
    marginBottom: 24,
  },
  roleLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  roleOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  roleOption: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  roleOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  roleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
  },
  roleTextSelected: {
    color: Colors.white,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  createAccountButton: {
    marginTop: 24,
    marginBottom: 40,
  },
});