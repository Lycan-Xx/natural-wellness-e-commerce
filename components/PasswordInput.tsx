import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import Input from './Input';
import Colors from '@/constants/Colors';

interface PasswordInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
  error?: string;
  touched?: boolean;
  label?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder = 'Password',
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordIcon = (
    <TouchableOpacity onPress={togglePasswordVisibility}>
      {showPassword ? (
        <EyeOff size={20} color={Colors.text.secondary} />
      ) : (
        <Eye size={20} color={Colors.text.secondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <Input
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      error={error}
      touched={touched}
      secureTextEntry={!showPassword}
      rightIcon={passwordIcon}
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect={false}
    />
  );
};

export default PasswordInput;