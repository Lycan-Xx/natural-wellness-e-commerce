import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface HeaderBarProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  showBackButton = true,
  rightComponent,
  onBackPress,
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      // Always go to welcome screen if on sign in page
      if (title === 'Sign In') {
        router.replace('/(auth)/welcome');
      } else {
        router.back();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backButton}
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {rightComponent || <View style={styles.placeholder} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  placeholder: {
    width: 24,
  },
});

export default HeaderBar;