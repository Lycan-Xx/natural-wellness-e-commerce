import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';

const countries = [
  { id: 'ng', name: 'Nigeria' },
  { id: 'uk', name: 'United Kingdom' },
];

const states = {
  ng: ['Lagos', 'Abuja', 'Kano'],
  uk: ['England', 'Scotland', 'Wales'],
};

const localities = {
  Lagos: ['Local 1', 'Local 2', 'Local 3'],
  Abuja: ['Local 1', 'Local 2', 'Local 3'],
  England: ['Local 1', 'Local 2', 'Local 3'],
};

interface AddressScreenProps {
  onClose?: () => void;
}

export default function AddressScreen({ onClose }: AddressScreenProps) {
  const [formData, setFormData] = useState({
    country: 'ng',
    state: '',
    locality: '',
    address: '',
  });

  const handleSave = () => {
    console.log('Address saved:', formData);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <HeaderBar 
        title="Address" 
        showBackButton={true}
        onBackPress={onClose}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Country</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.country}
            onValueChange={(value) => setFormData({ ...formData, country: value })}
          >
            {countries.map((country) => (
              <Picker.Item
                key={country.id}
                label={country.name}
                value={country.id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>State</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.state}
            onValueChange={(value) => setFormData({ ...formData, state: value })}
          >
            {states[formData.country as keyof typeof states].map((state) => (
              <Picker.Item key={state} label={state} value={state} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Local Government</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.locality}
            onValueChange={(value) => setFormData({ ...formData, locality: value })}
          >
            {formData.state && localities[formData.state as keyof typeof localities]?.map((local) => (
              <Picker.Item key={local} label={local} value={local} />
            ))}
          </Picker>
        </View>

        <Input
          label="Street Address"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          multiline
          numberOfLines={3}
        />

        <Button
          title="Save Address"
          onPress={handleSave}
          style={styles.submitButton}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 40,
  },
});