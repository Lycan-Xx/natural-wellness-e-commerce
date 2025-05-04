import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  KeyboardTypeOptions,
} from 'react-native';
import Colors from '@/constants/Colors';

interface OTPInputProps {
  otpLength: number;
  value: string;
  onChange: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

const OTPInput: React.FC<OTPInputProps> = ({
  otpLength = 4,
  value,
  onChange,
  keyboardType = 'number-pad',
}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [localOtpValues, setLocalOtpValues] = useState<string[]>(
    Array(otpLength).fill('')
  );

  useEffect(() => {
    if (value) {
      const valueArray = value.split('');
      setLocalOtpValues(
        Array(otpLength)
          .fill('')
          .map((_, index) => valueArray[index] || '')
      );
    }
  }, [value, otpLength]);

  const handleInputChange = (text: string, index: number) => {
    // Only accept single digit
    const singleDigit = text.slice(-1);
    
    // Update local state
    const newOtpValues = [...localOtpValues];
    newOtpValues[index] = singleDigit;
    setLocalOtpValues(newOtpValues);
    
    // Update parent component
    onChange(newOtpValues.join(''));

    // Auto focus next input if a value is entered
    if (singleDigit && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace') {
      if (localOtpValues[index] === '' && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtpValues = [...localOtpValues];
        newOtpValues[index] = '';
        setLocalOtpValues(newOtpValues);
        onChange(newOtpValues.join(''));
      }
    }
  };

  const handleInputFocus = (index: number) => {
    // Focus handling logic
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < otpLength; i++) {
      inputs.push(
        <TextInput
          key={i}
          ref={(ref) => (inputRefs.current[i] = ref)}
          style={[
            styles.input,
            localOtpValues[i] ? styles.filledInput : {},
          ]}
          value={localOtpValues[i]}
          onChangeText={(text) => handleInputChange(text, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          onFocus={() => handleInputFocus(i)}
          keyboardType={keyboardType}
          maxLength={1}
          selectTextOnFocus
          accessibilityLabel={`OTP digit ${i + 1}`}
        />
      );
    }
    return inputs;
  };

  return <View style={styles.container}>{renderInputs()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 16,
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: Colors.text.primary,
    backgroundColor: Colors.white,
    borderColor: Colors.border,
  },
  filledInput: {
    borderColor: Colors.primary,
    backgroundColor: '#F0FFF4',
  },
});

export default OTPInput;