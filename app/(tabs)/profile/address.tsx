import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { MapPin, Plus, Edit2, Trash2, Check } from 'lucide-react-native';
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

export default function AddressScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    country: 'ng',
    state: '',
    locality: '',
    address: '',
  });
  const [addresses, setAddresses] = useState([
    { id: '1', type: 'Home', address: '123 Green Street, Plant City, 12345', isDefault: true },
    { id: '2', type: 'Work', address: '456 Office Road, Business District, 67890', isDefault: false },
  ]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleSave = () => {
    const newAddress = {
      id: isEditing ? editingAddress.id : Date.now().toString(),
      type: 'Home',
      address: `${formData.address}, ${formData.locality}, ${formData.state}, ${
        countries.find(c => c.id === formData.country)?.name
      }`,
      isDefault: isEditing ? editingAddress.isDefault : addresses.length === 0, // Make first address default
    };

    if (isEditing) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? newAddress : addr
      ));
    } else {
      setAddresses([...addresses, newAddress]);
    }

    resetForm();
    setShowAddressForm(false);
  };

  const resetForm = () => {
    setFormData({
      country: 'ng',
      state: '',
      locality: '',
      address: '',
    });
    setIsEditing(false);
    setEditingAddress(null);
  };

  const handleEdit = (address) => {
    setIsEditing(true);
    setEditingAddress(address);
    setShowAddressForm(true);

    // Try to parse address string to fill form fields, fallback to empty string
    const parts = address.address.split(',').map(s => s.trim());
    setFormData({
      country: countries.find(c => parts[3] && c.name === parts[3])?.id || 'ng',
      state: parts[2] || '',
      locality: parts[1] || '',
      address: parts[0] || '',
    });
  };

  const handleDelete = (addressId) => {
    // Check if it's the default address
    const addressToDelete = addresses.find(addr => addr.id === addressId);
    const isDefaultAddress = addressToDelete?.isDefault;

    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
            
            // If we deleted the default address and there are other addresses,
            // make the first one the default
            if (isDefaultAddress && updatedAddresses.length > 0) {
              updatedAddresses[0].isDefault = true;
            }
            
            setAddresses(updatedAddresses);
          }
        },
      ]
    );
  };

  const handleSetDefault = (addressId) => {
    // Update all addresses to set the selected one as default
    setAddresses(
      addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    );
  };

  const handleBackNavigation = () => {
    if (showAddressForm) {
      setShowAddressForm(false);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {showAddressForm ? (
        // Address Form View
        <>
          <HeaderBar 
            title={isEditing ? "Edit Address" : "Add Address"} 
            showBackButton
            onBackPress={handleBackNavigation}
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
                onValueChange={(value) => setFormData({ ...formData, state: value, locality: '' })}
              >
                {(states[formData.country] || []).map((state) => (
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
                {(formData.state && localities[formData.state] ? localities[formData.state] : []).map((local) => (
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
              title={isEditing ? "Update Address" : "Save Address"}
              onPress={handleSave}
              style={styles.submitButton}
            />
          </ScrollView>
        </>
      ) : (
        // Address List View
        <>
          <HeaderBar 
            title="My Addresses" 
            showBackButton 
            onBackPress={handleBackNavigation}
          />
          <ScrollView style={styles.modalContent}>
            {addresses.map((address) => (
              <View key={address.id} style={[
                styles.addressCard,
                address.isDefault && styles.defaultAddressCard
              ]}>
                <View style={styles.leftSection}>
                  <MapPin size={24} color={address.isDefault ? Colors.primary : Colors.text.secondary} />
                  {address.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.addressInfo}>
                  <Text style={styles.addressType}>{address.type}</Text>
                  <Text style={styles.addressText}>{address.address}</Text>
                  
                  {!address.isDefault && (
                    <TouchableOpacity 
                      onPress={() => handleSetDefault(address.id)}
                      style={styles.setDefaultButton}
                    >
                      <Text style={styles.setDefaultText}>Set as Default</Text>
                    </TouchableOpacity>
                  )}
                </View>
                
                <View style={styles.addressActions}>
                  <TouchableOpacity 
                    onPress={() => handleEdit(address)}
                    style={styles.actionButton}
                  >
                    <Edit2 size={20} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleDelete(address.id)}
                    style={styles.actionButton}
                  >
                    <Trash2 size={20} color={Colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.modalFooter}>
            <Button
              title="Add New Address"
              onPress={() => {
                resetForm();
                setShowAddressForm(true);
              }}
              icon={<Plus size={20} color={Colors.white} />}
            />
          </View>
        </>
      )}
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
  modalContent: {
    padding: 20,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  defaultAddressCard: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: '#F5FAFF',
  },
  leftSection: {
    alignItems: 'center',
    marginRight: 4,
  },
  defaultBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  defaultText: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  addressInfo: {
    flex: 1,
    marginLeft: 8,
  },
  addressType: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
  },
  addressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  setDefaultButton: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  setDefaultText: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  addressActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  modalFooter: {
    padding: 20,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});