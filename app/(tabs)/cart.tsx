import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Trash2, Plus, Minus, MapPin, Truck } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';
import { useCart } from '@/context/CartContext';

const shippingOptions = [
  {
    id: 'fast',
    name: 'Lightning fast',
    duration: '3 - 5 days',
    price: 15.99,
  },
  {
    id: 'standard',
    name: 'On time',
    duration: '1 week',
    price: 9.99,
  },
  {
    id: 'economy',
    name: 'Till it arrives',
    duration: '2 to 3 weeks',
    price: 4.99,
  },
];

export default function CartScreen() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

  const handleQuantityChange = (
    productId: string,
    currentQuantity: number,
    increment: number
  ) => {
    const newQuantity = currentQuantity + increment;
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleProceedToPayment = () => {
    // Implement payment flow
    console.log('Proceeding to payment');
  };

  const finalTotal = total + selectedShipping.price;

  const renderCheckoutModal = () => (
    <Modal
      visible={showCheckoutModal}
      animationType="slide"
      onRequestClose={() => setShowCheckoutModal(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <HeaderBar
          title="Check Out"
          showBackButton={true}
          onBackPress={() => setShowCheckoutModal(false)}
        />

        <ScrollView style={styles.modalContent}>
          {/* Address Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            <TouchableOpacity
              style={styles.addressCard}
              onPress={() => setShowAddressModal(true)}
            >
              <MapPin size={24} color={Colors.text.secondary} />
              <View style={styles.addressInfo}>
                <Text style={styles.addressType}>Home</Text>
                <Text style={styles.addressText}>
                  123 Green Street, Plant City, 12345
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Order Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Items</Text>
            {items.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>
                    Quantity: {item.quantity}
                  </Text>
                  <Text style={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Shipping Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping</Text>
            <TouchableOpacity
              style={styles.shippingSelector}
              onPress={() => setShowShippingModal(true)}
            >
              <View style={styles.shippingInfo}>
                <Truck size={24} color={Colors.text.secondary} />
                <View style={styles.shippingDetails}>
                  <Text style={styles.shippingName}>
                    {selectedShipping.name}
                  </Text>
                  <Text style={styles.shippingDuration}>
                    {selectedShipping.duration}
                  </Text>
                </View>
              </View>
              <Text style={styles.shippingPrice}>
                ${selectedShipping.price.toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Total Section */}
          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Shipping</Text>
              <Text style={styles.totalValue}>
                ${selectedShipping.price.toFixed(2)}
              </Text>
            </View>
            <View style={[styles.totalRow, styles.finalTotal]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.grandTotal}>${finalTotal.toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.footer}>
          <Button title="Proceed to Payment" onPress={handleProceedToPayment} />
        </View>
      </SafeAreaView>
    </Modal>
  );

  const renderShippingModal = () => (
    <Modal
      visible={showShippingModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowShippingModal(false)}
    >
      <View style={styles.shippingModalContainer}>
        <View style={styles.shippingModalContent}>
          <HeaderBar
            title="Choose Shipping"
            showBackButton={true}
            onBackPress={() => setShowShippingModal(false)}
          />
          <ScrollView style={styles.modalScroll}>
            {shippingOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.shippingOption,
                  selectedShipping.id === option.id && styles.selectedOption,
                ]}
                onPress={() => {
                  setSelectedShipping(option);
                  setShowShippingModal(false);
                }}
              >
                <View style={styles.optionInfo}>
                  <Text style={styles.optionName}>{option.name}</Text>
                  <Text style={styles.optionDuration}>{option.duration}</Text>
                </View>
                <Text style={styles.optionPrice}>
                  ${option.price.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
      </View>

      <ScrollView style={styles.content}>
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} />

            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() =>
                    handleQuantityChange(item.id, item.quantity, -1)
                  }
                  style={styles.quantityButton}
                >
                  <Minus size={16} color={Colors.text.primary} />
                </TouchableOpacity>

                <Text style={styles.quantityText}>{item.quantity}</Text>

                <TouchableOpacity
                  onPress={() =>
                    handleQuantityChange(item.id, item.quantity, 1)
                  }
                  style={styles.quantityButton}
                >
                  <Plus size={16} color={Colors.text.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.itemActions}>
              <TouchableOpacity
                onPress={() => removeFromCart(item.id)}
                style={styles.deleteButton}
              >
                <Trash2 size={20} color={Colors.error} />
              </TouchableOpacity>
              <Text style={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Cart Total</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <Button
          title="Checkout"
          onPress={() => setShowCheckoutModal(true)}
          style={styles.checkoutButton}
        />
      </View>

      {renderCheckoutModal()}
      {renderShippingModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.white,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
    marginHorizontal: 12,
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  deleteButton: {
    padding: 4,
  },
  itemTotal: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.primary,
    marginTop: 8,
  },
  footer: {
    backgroundColor: Colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
  },
  totalAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.primary,
  },
  checkoutButton: {
    marginBottom: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalContent: {
    flex: 1,
  },
  section: {
    padding: 20,
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  addressInfo: {
    marginLeft: 12,
    flex: 1,
  },
  addressType: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
  },
  addressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  itemQuantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  shippingSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  shippingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shippingDetails: {
    marginLeft: 12,
  },
  shippingName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
  },
  shippingDuration: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  shippingPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: Colors.primary,
  },
  totalSection: {
    padding: 20,
    backgroundColor: Colors.white,
    marginBottom: 100,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
  },
  finalTotal: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  grandTotal: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.primary,
  },
  shippingModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  shippingModalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalScroll: {
    padding: 20,
  },
  shippingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: '#E8F5E9',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  optionInfo: {
    flex: 1,
  },
  optionName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
  },
  optionDuration: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  optionPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 16,
  },
});
