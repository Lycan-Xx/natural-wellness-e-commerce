// GreenCartLogo.jsx - Redesigned Logo Component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import Colors from '@/constants/Colors';

const GroceryCartIcon = () => (
  <Svg width={64} height={64} viewBox="0 0 24 24" fill="none">
    {/* Cart Base */}
    <Path
      d="M2 3h2l2.5 12h10L19 6H6"
      stroke={Colors.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Cart Wheels */}
    <Circle cx="8.5" cy="19" r="1.5" fill={Colors.primary} />
    <Circle cx="17" cy="19" r="1.5" fill={Colors.primary} />
    
    {/* Leaf Accent */}
    <G transform="translate(12, 9)">
      <Path
        d="M0,-3 C3,-3 3,0 3,3 C0,3 -3,3 -3,0 C-3,-3 0,-3 0,-3 Z"
        fill="none"
        stroke={Colors.primary}
        strokeWidth="1.5"
      />
      <Path
        d="M0,3 C0,0 0,-3 0,-3"
        stroke={Colors.primary}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </G>
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

  const getTextSize = () => {
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
    <View style={[styles.container, getLogoSize()]}>
      <GroceryCartIcon />
      <View style={styles.textContainer}>
        <Text style={[styles.logoText, getTextSize()]}>
          <Text style={styles.greenText}>Green</Text>Cart
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallLogo: {
    paddingVertical: 6,
  },
  mediumLogo: {
    paddingVertical: 12,
  },
  largeLogo: {
    paddingVertical: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    color: Colors.text.primary,
    marginTop: 8,
  },
  greenText: {
    color: Colors.primary,
  },
  smallText: {
    fontSize: 16,
  },
  mediumText: {
    fontSize: 20,
  },
  largeText: {
    fontSize: 28,
  },
  tagline: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
});

export default GreenCartLogo;