import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Check } from 'lucide-react-native';

interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  labelComponent?: React.ReactNode;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onPress,
  label,
  labelComponent,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && <Check size={16} color={Colors.white} />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
      {labelComponent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.primary,
  },
});

export default CheckBox;