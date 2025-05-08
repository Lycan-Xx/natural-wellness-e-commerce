import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Google, CreditCard, Bank, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';

const paymentOptions = [
  { id: 'google', label: 'Google Pay' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'bank', label: 'Bank Transfer' },
];

export default function PaymentMethodsVendor({ onClose }) {
  const [methods, setMethods] = useState([]);
  const [activeOption, setActiveOption] = useState(paymentOptions[0]); // Initialize with first option
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    gateway: paymentOptions[0].id,
    email: '',
    bankName: '',
    accountNumber: '',
    accountName: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const openModal = (option) => {
    setActiveOption(option);
    setIsEditing(false);
    setFormData({
      id: '',
      gateway: option.id,
      email: '',
      bankName: '',
      accountNumber: '',
      accountName: ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    // Basic validation per gateway
    if (activeOption.id === 'bank') {
      if (!formData.bankName || !formData.accountNumber || !formData.accountName) {
        return Alert.alert('Missing Info', 'Please fill in all bank fields');
      }
    } else {
      if (!formData.email) {
        return Alert.alert('Missing Info', `Please enter your ${activeOption.label} email address`);
      }
    }
    if (isEditing) {
      setMethods(methods.map(m => (m.id === formData.id ? formData : m)));
    } else {
      setMethods([...methods, { ...formData, id: Date.now().toString() }]);
    }
    setShowModal(false);
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setFormData(item);
    setActiveOption(paymentOptions.find(opt => opt.id === item.gateway));
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Alert.alert('Remove Method', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setMethods(methods.filter(m => m.id !== id)) },
    ]);
  };

  const renderMethod = ({ item }) => {
    const label = paymentOptions.find(opt => opt.id === item.gateway)?.label;
    return (
      <View style={styles.methodItem}>
        <Text style={styles.methodText}>{label}</Text>
        <View style={styles.methodActions}>
          <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionBtn}>
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionBtn}>
            <Text style={[styles.actionText, { color: Colors.error }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="Vendor Payment Settings" showBackButton onBackPress={onClose} />
      <View style={styles.content}>
        <FlatList
          data={methods}
          renderItem={renderMethod}
          keyExtractor={i => i.id}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No payment methods configured.</Text>
            </View>
          )}
        />
        <View style={styles.optionsContainer}>
          {paymentOptions.map(opt => (
            <TouchableOpacity key={opt.id} style={styles.optionBtn} onPress={() => openModal(opt)}>
              <Text style={styles.optionText}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {activeOption && ( // Add conditional rendering
        <Modal visible={showModal} animationType="slide" transparent onRequestClose={() => setShowModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{isEditing ? 'Edit' : 'Add'} {activeOption.label}</Text>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <X size={20} color={Colors.text.secondary} />
                </TouchableOpacity>
              </View>
              {activeOption.id !== 'bank' ? (
                <TextInput
                  style={styles.input}
                  placeholder={`${activeOption.label} Email Address`}
                  value={formData.email}
                  onChangeText={email => setFormData({ ...formData, email })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Bank Name"
                    value={formData.bankName}
                    onChangeText={bankName => setFormData({ ...formData, bankName })}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Account Number"
                    keyboardType="numeric"
                    value={formData.accountNumber}
                    onChangeText={accountNumber => setFormData({ ...formData, accountNumber })}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Account Name"
                    value={formData.accountName}
                    onChangeText={accountName => setFormData({ ...formData, accountName })}
                  />
                </>
              )}
              <Button 
                title={isEditing ? 'Save Changes' : 'Save'} 
                onPress={handleSave} 
                style={styles.saveBtn} 
              />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, padding: 20 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontFamily: 'Poppins-Regular', fontSize: 16, color: Colors.text.secondary },
  methodItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: Colors.white, borderRadius: 12, marginBottom: 12 },
  methodText: { fontFamily: 'Poppins-Medium', fontSize: 16, color: Colors.text.primary },
  methodActions: { flexDirection: 'row' },
  actionBtn: { marginLeft: 12 },
  actionText: { fontFamily: 'Poppins-Regular', fontSize: 14, color: Colors.primary },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16, borderTopWidth: 1, borderColor: Colors.border },
  optionBtn: { padding: 12, backgroundColor: Colors.primary, borderRadius: 8 },
  optionText: { color: Colors.white, fontFamily: 'Poppins-Medium', fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { width: '90%', backgroundColor: Colors.white, borderRadius: 16, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontFamily: 'Poppins-Bold', fontSize: 18, color: Colors.text.primary },
  input: { backgroundColor: Colors.background, borderRadius: 8, padding: 12, marginBottom: 12, fontFamily: 'Poppins-Regular' },
  saveBtn: { marginTop: 8 },
});
