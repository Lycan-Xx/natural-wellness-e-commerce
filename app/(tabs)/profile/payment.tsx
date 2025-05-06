import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { CreditCard, Wallet } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';
import { Picker } from '@react-native-picker/picker';

const cryptoOptions = [
  'Bitcoin (BTC)',
  'Ethereum (ETH)',
  'Binance Coin (BNB)',
  'Cardano (ADA)',
];

export default function PaymentMethodsScreen() {
  const [showCardModal, setShowCardModal] = useState(false);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [cryptoData, setCryptoData] = useState({
    type: cryptoOptions[0],
    address: '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="Payment Methods" />
      
      <View style={styles.content}>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => setShowCardModal(true)}
          >
            <CreditCard size={32} color={Colors.primary} />
            <Text style={styles.gridItemText}>Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => setShowCryptoModal(true)}
          >
            <Wallet size={32} color={Colors.primary} />
            <Text style={styles.gridItemText}>Crypto</Text>
          </TouchableOpacity>
        </View>

        {/* Card Modal */}
        <Modal
          visible={showCardModal}
          animationType="slide"
          onRequestClose={() => setShowCardModal(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <HeaderBar
              title="Add Card"
              onBackPress={() => setShowCardModal(false)}
            />
            
            <View style={styles.modalContent}>
              <Input
                label="Card Number"
                value={cardData.number}
                onChangeText={(text) => setCardData({ ...cardData, number: text })}
                keyboardType="numeric"
                placeholder="1234 5678 9012 3456"
              />

              <Input
                label="Cardholder Name"
                value={cardData.name}
                onChangeText={(text) => setCardData({ ...cardData, name: text })}
                placeholder="John Doe"
              />

              <View style={styles.row}>
                <Input
                  label="Expiry Date"
                  value={cardData.expiry}
                  onChangeText={(text) => setCardData({ ...cardData, expiry: text })}
                  placeholder="MM/YY"
                  containerStyle={{ flex: 1, marginRight: 8 }}
                />

                <Input
                  label="CVV"
                  value={cardData.cvv}
                  onChangeText={(text) => setCardData({ ...cardData, cvv: text })}
                  placeholder="123"
                  containerStyle={{ flex: 1, marginLeft: 8 }}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>

              <Button
                title="Save Card"
                onPress={() => setShowCardModal(false)}
                style={styles.submitButton}
              />
            </View>
          </SafeAreaView>
        </Modal>

        {/* Crypto Modal */}
        <Modal
          visible={showCryptoModal}
          animationType="slide"
          onRequestClose={() => setShowCryptoModal(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <HeaderBar
              title="Add Crypto Wallet"
              onBackPress={() => setShowCryptoModal(false)}
            />
            
            <View style={styles.modalContent}>
              <Text style={styles.label}>Cryptocurrency</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={cryptoData.type}
                  onValueChange={(value) => setCryptoData({ ...cryptoData, type: value })}
                >
                  {cryptoOptions.map((crypto) => (
                    <Picker.Item key={crypto} label={crypto} value={crypto} />
                  ))}
                </Picker>
              </View>

              <Input
                label="Wallet Address"
                value={cryptoData.address}
                onChangeText={(text) => setCryptoData({ ...cryptoData, address: text })}
                placeholder="Enter your wallet address"
              />

              <Button
                title="Save Wallet"
                onPress={() => setShowCryptoModal(false)}
                style={styles.submitButton}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
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
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  gridItem: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridItemText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalContent: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
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