import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import Colors from '@/constants/Colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  style,
  textStyle,
  disabled = false,
  ...props
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return [
          styles.button,
          styles.primaryButton,
          disabled && styles.disabledButton,
          style
        ];
      case 'secondary':
        return [
          styles.button,
          styles.secondaryButton,
          disabled && styles.disabledOutlineButton,
          style
        ];
      case 'outline':
        return [
          styles.button,
          styles.outlineButton,
          disabled && styles.disabledOutlineButton,
          style
        ];
      default:
        return [styles.button, styles.primaryButton, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return [
          styles.text,
          styles.primaryText,
          getSizeStyle(),
          textStyle
        ];
      case 'secondary':
        return [
          styles.text,
          styles.secondaryText,
          getSizeStyle(),
          textStyle
        ];
      case 'outline':
        return [
          styles.text,
          styles.outlineText,
          getSizeStyle(),
          textStyle
        ];
      default:
        return [styles.text, styles.primaryText, getSizeStyle(), textStyle];
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallText;
      case 'medium':
        return styles.mediumText;
      case 'large':
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={getButtonStyle()}
      disabled={isLoading || disabled}
      activeOpacity={0.7}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? 'white' : Colors.primary} 
          size="small" 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  disabledButton: {
    backgroundColor: '#A5D6A7',
    opacity: 0.7,
  },
  disabledOutlineButton: {
    opacity: 0.5,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.text.primary,
  },
  outlineText: {
    color: Colors.primary,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
});

export default Button;