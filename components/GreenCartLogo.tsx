import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Colors from '@/constants/Colors';

const MortarPestle = () => (
  <Svg width={64} height={64} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 14c.5 3 2.5 5 5.5 5s5-2 5.5-5M12 9V3m0 3H8M12 6h4M4.2 13.5L6 15.5M19.8 13.5L18 15.5M7 8H3.5C2.5 8 2 8.5 2 9.5C2 12 4 14 7 14h10c3 0 5-2 5-4.5c0-1-.5-1.5-1.5-1.5H17"
      stroke={Colors.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface GreenCartLogoProps {
  size?: 'small' | 'medium' | 'large';
}

const GreenCartLogo: React.FC<GreenCartLogoProps> = ({ 
  size = 'medium' 
}) => {
  const getLogoSize = () => {
    switch (size) {
      case 'small':
        return styles.smallLogo;
      case 'medium':
        return styles.mediumLogo;
      case 'large':
        return styles.largeLogo;
      default:
        return styles.mediumLogo;
    }
  };

  return (
    <View style={[styles.container, getLogoSize()]}>
      <MortarPestle />
      <Text style={styles.logoText}>GreenCart</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallLogo: {
    paddingVertical: 8,
  },
  mediumLogo: {
    paddingVertical: 16,
  },
  largeLogo: {
    paddingVertical: 24,
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.primary,
    marginTop: 8,
  },
});

export default GreenCartLogo;