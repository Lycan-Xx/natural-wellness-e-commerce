import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Camera } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

export default function EditProfileScreen() {
  const [formData, setFormData] = useState({
    fullName: 'Mukhlisin',
    email: 'Mukhlisin@gmail.com',
    phone: '0855-3234-2345',
    gender: 'male',
  });

  const router = useRouter();

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    router.back();
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="Edit Profile" />
      
      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Camera size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <Input
          label="Full Name"
          value={formData.fullName}
          onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        />

        <Input
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
        />

        <Input
          label="Phone Number"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.gender}
            onValueChange={(value) => setFormData({ ...formData, gender: value })}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>

        <Button
          title="Save Changes"
          onPress={handleSubmit}
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.white,
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
  },
});