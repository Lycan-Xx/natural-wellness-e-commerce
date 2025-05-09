import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Package, ShoppingBag, DollarSign, ArrowDownLeft, Check, CreditCard, Wallet, Globe } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';
import VendorProfileScreen from './profile';
import ProductsScreen from './products';
import OrdersScreen from './orders';

// Mock transaction data
const transactions = [
  { id: '1', title: 'Echinacea Plant', date: 'Today', amount: -10.00, type: 'sale' },
  { id: '2', title: 'Order', date: 'Yesterday', amount: -12.00, type: 'sale' },
  { id: '3', title: 'Deposit', date: 'May 10', amount: 20.00, type: 'deposit' },
];

// Withdraw Method Option Component
const WithdrawMethodOption = ({ 
  id, 
  name, 
  icon, 
  selected, 
  onSelect 
}) => {
  // Safely render the icon
  const renderIcon = () => {
    const IconComponent = icon;
    return IconComponent ? (
      <IconComponent size={24} color={selected === id ? Colors.primary : Colors.text.secondary} />
    ) : null;
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.paymentOption,
        selected === id && styles.selectedPaymentOption,
      ]}
      onPress={() => onSelect(id)}
    >
      <View style={styles.paymentOptionLeft}>
        <View style={styles.paymentIconContainer}>
          {renderIcon()}
        </View>
        <Text style={styles.paymentName}>{name}</Text>
      </View>
      
      <View style={[
        styles.radioButton,
        selected === id && styles.radioButtonSelected,
      ]}>
        {selected === id && (
          <View style={styles.radioButtonInner} />
        )}
      </View>
    </TouchableOpacity>
  );
};

// Success Animation Component
const WithdrawSuccessAnimation = ({ onComplete }) => {
  const scaleValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // Auto-dismiss after showing success
    const timeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.successContainer}>
      <Animated.View
        style={[
          styles.successCircle,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
        ]}
      >
        <Check size={50} color="#fff" />
      </Animated.View>
      <Animated.Text
        style={[
          styles.successText,
          {
            opacity: opacityValue,
            transform: [
              {
                translateY: opacityValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        Withdraw Successful
      </Animated.Text>
    </View>
  );
};

export default function VendorDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedWithdrawMethod, setSelectedWithdrawMethod] = useState('googlewallet');
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);
  const availableBalance = 2458.50;

  const handleProfilePress = () => {
    setShowProfileModal(true);
  };

  const handleProductsPress = () => {
    setShowProductsModal(true);
  };

  const handleWithdrawSubmit = () => {
    // Here you would normally handle the API call to process the withdrawal
    setShowWithdrawSuccess(true);
  };

  const handleWithdrawSuccessComplete = () => {
    setShowWithdrawSuccess(false);
    setShowWithdrawModal(false);
    // Reset the withdraw form
    setWithdrawAmount('');
    setSelectedWithdrawMethod('googlewallet');
  };

  // Format input to always have 2 decimal places
  const handleAmountChange = (text) => {
    // Only allow numbers and decimal point
    const filtered = text.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = filtered.split('.');
    if (parts.length > 2) {
      return;
    }
    
    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2);
      setWithdrawAmount(parts.join('.'));
      return;
    }
    
    setWithdrawAmount(filtered);
  };

  // Withdrawal methods
  const withdrawMethods = [
    {
      id: 'googlewallet',
      name: 'Google Wallet',
      icon: Wallet,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: CreditCard,
    },
    {
      id: 'bank',
      name: 'International Bank',
      icon: Globe,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={handleProfilePress}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>{user?.fullName}</Text>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <View style={styles.balanceRow}>
            <DollarSign size={32} color={Colors.primary} />
            <Text style={styles.balanceAmount}>{availableBalance.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.withdrawButton}
            onPress={() => setShowWithdrawModal(true)}
          >
            <ArrowDownLeft size={20} color={Colors.white} />
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statsColumn}>
            <Text style={styles.statsLabel}>Products</Text>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
            </View>
          </View>

          <View style={styles.statsColumn}>
            <Text style={styles.statsLabel}>Orders</Text>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionCard, styles.activeActionCard]}
            onPress={handleProductsPress}
          >
            <Package size={24} color={Colors.white} />
            <Text style={[styles.actionText, styles.activeActionText]}>Manage Products</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, styles.activeActionCard]}
            onPress={() => setShowOrdersModal(true)}
          >
            <ShoppingBag size={24} color={Colors.white} />
            <Text style={[styles.actionText, styles.activeActionText]}>View Orders</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Transaction History</Text>
        <View style={styles.transactionsContainer}>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.amount > 0 ? styles.positiveAmount : styles.negativeAmount,
                ]}
              >
                {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Products Modal */}
      <Modal
        visible={showProductsModal}
        animationType="slide"
        onRequestClose={() => setShowProductsModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <ProductsScreen onClose={() => setShowProductsModal(false)} />
        </SafeAreaView>
      </Modal>

      {/* Orders Modal */}
      <Modal
        visible={showOrdersModal}
        animationType="slide"
        onRequestClose={() => setShowOrdersModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <OrdersScreen onClose={() => setShowOrdersModal(false)} />
        </SafeAreaView>
      </Modal>

      {/* Profile Modal */}
      <Modal
        visible={showProfileModal}
        animationType="slide"
        onRequestClose={() => setShowProfileModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <VendorProfileScreen onClose={() => setShowProfileModal(false)} />
        </SafeAreaView>
      </Modal>

      {/* Withdraw Modal */}
      <Modal
        visible={showWithdrawModal}
        animationType="slide"
        transparent={showWithdrawSuccess}
        onRequestClose={() => {
          if (!showWithdrawSuccess) {
            setShowWithdrawModal(false);
          }
        }}
      >
        {showWithdrawSuccess ? (
          <WithdrawSuccessAnimation onComplete={handleWithdrawSuccessComplete} />
        ) : (
          <SafeAreaView style={styles.modalContainer}>
            <HeaderBar 
              title="Withdraw Funds" 
              showBackButton 
              onBackPress={() => setShowWithdrawModal(false)} 
            />
            <ScrollView style={styles.modalContent}>
              <View style={styles.balanceInfo}>
                <Text style={styles.balanceInfoLabel}>Available Balance</Text>
                <Text style={styles.balanceInfoAmount}>${availableBalance.toFixed(2)}</Text>
              </View>
              
              {/* Amount Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Amount to Withdraw</Text>
                <View style={styles.amountInputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.amountInput}
                    value={withdrawAmount}
                    onChangeText={handleAmountChange}
                    placeholder="0.00"
                    keyboardType="numeric"
                    placeholderTextColor={Colors.text.secondary}
                  />
                </View>
              </View>
              
              {/* Withdraw Method Selection */}
              <Text style={[styles.sectionTitle, {marginTop: 20}]}>Select Withdraw Method</Text>
              
              {withdrawMethods.map((method) => (
                <WithdrawMethodOption
                  key={method.id}
                  id={method.id}
                  name={method.name}
                  icon={method.icon}
                  selected={selectedWithdrawMethod}
                  onSelect={setSelectedWithdrawMethod}
                />
              ))}
            </ScrollView>
            
            <View style={styles.footer}>
              <Button
                title={`Proceed Withdraw $${withdrawAmount || '0.00'}`}
                onPress={handleWithdrawSubmit}
                disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > availableBalance}
              />
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.border,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
  },
  nameText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
  },
  balanceCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: Colors.text.primary,
    marginLeft: 8,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
  },
  withdrawButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.white,
    marginLeft: 8,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statsColumn: {
    flex: 1,
    marginHorizontal: 8,
  },
  statsLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  statCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
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
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
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
  activeActionCard: {
    backgroundColor: Colors.primary,
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  activeActionText: {
    color: Colors.white,
  },
  transactionsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
  },
  transactionDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  transactionAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  positiveAmount: {
    color: Colors.success,
  },
  negativeAmount: {
    color: Colors.error,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.text.primary,
    marginTop: 12,
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  editButton: {
    width: '100%',
  },
  balanceInfo: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 20,
  },
  balanceInfoLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  balanceInfoAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: Colors.text.primary,
    marginTop: 8,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.text.primary,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.text.primary,
    height: '100%',
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedPaymentOption: {
    backgroundColor: '#E8F5E9',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.text.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.primary,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  footer: {
    backgroundColor: Colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  successContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
  },
});