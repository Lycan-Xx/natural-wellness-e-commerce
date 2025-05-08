import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { CreditCard, Plus, Edit2, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';

export default function PaymentMethodsScreen() {
  const [showCardModal, setShowCardModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardData, setCardData] = useState({ id: '', number: '', name: '', expiry: '', cvv: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Pulsing animation for Add button
  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Card flip animation for form preview
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);
  const flipCard = (toBack) => {
    Animated.spring(flipAnim, {
      toValue: toBack ? 180 : 0,
      friction: 8,
      useNativeDriver: true,
    }).start(() => setFlipped(toBack));
  };

  const resetCardForm = () => {
    setCardData({ id: '', number: '', name: '', expiry: '', cvv: '' });
    setIsEditing(false);
    flipCard(false);
  };

  const handleCloseModal = () => {
    setShowCardModal(false);
    resetCardForm();
  };

  const handleAddCard = () => {
    if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
      Alert.alert('Missing Information', 'Please fill in all the fields.');
      return;
    }
    if (isEditing) {
      setCards(cards.map(c => (c.id === cardData.id ? cardData : c)));
    } else {
      setCards([...cards, { ...cardData, id: Date.now().toString() }]);
    }
    handleCloseModal();
  };

  const handleEditCard = (card) => {
    setCardData(card);
    setIsEditing(true);
    setShowCardModal(true);
  };

  const handleDeleteCard = (cardId) => {
    Alert.alert('Delete Card', 'Are you sure you want to delete this card?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setCards(cards.filter(c => c.id !== cardId)) },
    ]);
  };

  const formatCardNumber = (num) => num.length >= 4 ? '•••• •••• •••• ' + num.slice(-4) : num;

  const renderCardItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardItem}
      activeOpacity={0.8}
      onPress={() => handleEditCard(item)}
    >
      <CreditCard size={24} color={Colors.primary} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardNumber}>{formatCardNumber(item.number)}</Text>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardExpiry}>Expires {item.expiry}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteCard(item.id)}>
        <Trash2 size={20} color="#FF4747" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <CreditCard size={64} color={Colors.text.secondary} />
      <Text style={styles.emptyStateText}>Welcome!</Text>
      <Text style={styles.emptyStateSubText}>Save a card to speed up your checkout.</Text>
    </View>
  );

  // Interpolations for flip
  const frontInterpolate = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] });
  const backInterpolate = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['180deg', '360deg'] });

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="Payment Methods" />
      <View style={styles.content}>
        <FlatList
          data={cards}
          renderItem={renderCardItem}
          keyExtractor={i => i.id}
          ListEmptyComponent={renderEmptyState}
        />
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={() => { resetCardForm(); setShowCardModal(true); }}
          >
            <Plus size={24} color={Colors.white} />
            <Text style={styles.addButtonText}>Add New Card</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Card Modal */}
        <Modal visible={showCardModal} animationType="slide" onRequestClose={handleCloseModal}>
          <SafeAreaView style={styles.modalContainer}>
            <HeaderBar title={isEditing ? 'Edit Card' : 'Add Card'} showBackButton onBackPress={handleCloseModal} />
            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <ScrollView 
                contentContainerStyle={styles.modalContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Live Card Preview */}
                <View style={styles.previewContainer}>
                  <Animated.View style={[styles.cardPreview, { transform: [{ rotateY: frontInterpolate }] }]}>
                    <Text style={styles.previewNumber}>{cardData.number || '•••• •••• •••• ••••'}</Text>
                    <Text style={styles.previewName}>{cardData.name || 'FULL NAME'}</Text>
                    <Text style={styles.previewExpiry}>{cardData.expiry || 'MM/YY'}</Text>
                  </Animated.View>
                  <Animated.View style={[styles.cardPreviewBack, { transform: [{ rotateY: backInterpolate }] }]}>
                    <View style={styles.cvvStripe} />
                    <Text style={styles.previewCvv}>{cardData.cvv || 'CVV'}</Text>
                  </Animated.View>
                </View>

                {/* Form Inputs */}
                <Input
                  label="Card Number"
                  value={cardData.number}
                  onChangeText={t => setCardData({ ...cardData, number: t })}
                  keyboardType="numeric"
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  onFocus={() => flipCard(false)}
                />
                <Input
                  label="Cardholder Name"
                  value={cardData.name}
                  onChangeText={t => setCardData({ ...cardData, name: t })}
                  placeholder="John Doe"
                  onFocus={() => flipCard(false)}
                />
                <View style={styles.row}>
                  <Input
                    label="Expiry"
                    value={cardData.expiry}
                    onChangeText={t => setCardData({ ...cardData, expiry: t })}
                    placeholder="MM/YY"
                    maxLength={5}
                    containerStyle={{ flex: 1, marginRight: 8 }}
                    onFocus={() => flipCard(false)}
                  />
                  <Input
                    label="CVV"
                    value={cardData.cvv}
                    onChangeText={t => setCardData({ ...cardData, cvv: t })}
                    placeholder="123"
                    maxLength={3}
                    secureTextEntry
                    containerStyle={{ flex: 1, marginLeft: 8 }}
                    onFocus={() => flipCard(true)}
                  />
                </View>
                <Button title={isEditing ? 'Update Card' : 'Save Card'} onPress={handleAddCard} style={styles.submitButton} />
              </ScrollView>
            </KeyboardAvoidingView>
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
    flex: 1,
    padding: 20,
  },
  cardItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 12,
  },
  cardNumber: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
  },
  cardName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  cardExpiry: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.text.primary,
    marginTop: 16,
  },
  emptyStateSubText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 8,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  addButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.white,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalContent: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  submitButton: {
    marginTop: 24,
  },
  previewContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    perspective: 1000,
  },
  cardPreview: {
    width: 300,
    height: 180,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 20,
    backfaceVisibility: 'hidden',
  },
  cardPreviewBack: {
    position: 'absolute',
    top: 0,
    width: 300,
    height: 180,
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    backfaceVisibility: 'hidden',
  },
  previewNumber: {
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    marginBottom: 8,
  },
  previewName: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  previewExpiry: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  cvvStripe: {
    backgroundColor: Colors.white,
    height: 40,
    marginVertical: 12,
  },
  previewCvv: {
    color: Colors.white,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});
