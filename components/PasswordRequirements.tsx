import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { passwordRequirements } from '@/utils/validation';

interface PasswordRequirementsProps {
  password: string;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ 
  password 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password must include:</Text>
      {passwordRequirements.map((requirement) => {
        const isMet = requirement.regex.test(password);
        return (
          <View key={requirement.id} style={styles.requirementRow}>
            {isMet ? (
              <Check size={16} color={Colors.success} />
            ) : (
              <X size={16} color={Colors.text.tertiary} />
            )}
            <Text
              style={[
                styles.requirementText,
                isMet && styles.metRequirementText,
              ]}
            >
              {requirement.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  requirementText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 8,
  },
  metRequirementText: {
    color: Colors.success,
  },
});

export default PasswordRequirements;