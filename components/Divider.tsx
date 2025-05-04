import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

interface DividerProps {
  text?: string;
}

const Divider: React.FC<DividerProps> = ({ text }) => {
  if (!text) {
    return <View style={styles.simpleDivider} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  simpleDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    paddingHorizontal: 16,
  },
});

export default Divider;