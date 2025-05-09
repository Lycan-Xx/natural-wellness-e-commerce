import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { Check, CreditCard } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';

const PaymentMethodOption = ({ 
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

const PaymentSuccessAnimation = ({ onComplete }) => {
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
        Payment Successful
      </Animated.Text>
    </View>
  );
};

const PaymentModal = ({ visible, onClose, finalTotal }) => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayment = () => {
    setShowSuccess(true);
  };

  const handleSuccessComplete = () => {
    setShowSuccess(false);
    onClose();
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit / Debit Card',
      icon: CreditCard,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: CreditCard, // Using CreditCard as placeholder since Paypal icon is not available
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      icon: CreditCard, // Using CreditCard as placeholder since Google Pay icon is not available
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={showSuccess}
      onRequestClose={onClose}
    >
      {showSuccess ? (
        <PaymentSuccessAnimation onComplete={handleSuccessComplete} />
      ) : (
        <View style={styles.container}>
          <HeaderBar
            title="Choose a Payment Method"
            showBackButton={true}
            onBackPress={onClose}
          />

          <ScrollView style={styles.content}>
            {paymentMethods.map((method) => (
              <PaymentMethodOption
                key={method.id}
                id={method.id}
                name={method.name}
                icon={method.icon}
                selected={selectedPayment}
                onSelect={setSelectedPayment}
              />
            ))}

            <View style={styles.totalSection}>
              <View style={[styles.totalRow, styles.finalTotal]}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.grandTotal}>
                  ${finalTotal ? finalTotal.toFixed(2) : '0.00'}
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button
              title={`Pay $${finalTotal ? finalTotal.toFixed(2) : '0.00'}`}
              onPress={handlePayment}
            />
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
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
  totalSection: {
    padding: 20,
    backgroundColor: Colors.white,
    marginTop: 16,
    borderRadius: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  finalTotal: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
  },
  grandTotal: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.primary,
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

export default PaymentModal;