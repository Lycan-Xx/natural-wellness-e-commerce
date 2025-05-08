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
} from 'react-native';
import { CreditCard, Plus, Edit2, Trash2, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';

interface PaymentMethodsScreenProps {
  onClose?: () => void;
}

interface CardData {
  id: string;
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

export default function PaymentMethodsScreen({ onClose }: PaymentMethodsScreenProps) {
  const [showCardModal, setShowCardModal] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);
  const [cardData, setCardData] = useState<CardData>({
    id: '',
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const resetCardForm = () => {
    setCardData({
      id: '',
      number: '',
      name: '',
      expiry: '',
      cvv: '',
    });
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setShowCardModal(false);
    resetCardForm();
  };

  const handleAddCard = () => {
    if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (isEditing) {
      const updatedCards = cards.map((card: CardData) => 
        card.id === cardData.id ? cardData : card
      );
      setCards(updatedCards);
    } else {
      const newCard: CardData = {
        ...cardData,
        id: Date.now().toString(),
      };
      setCards([...cards, newCard]);
    }
    
    handleCloseModal();
  };

  const handleEditCard = (card: CardData) => {
    setCardData(card);
    setIsEditing(true);
    setShowCardModal(true);
  };

  const handleDeleteCard = (cardId: string) => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to delete this card?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedCards = cards.filter(card => card.id !== cardId);
            setCards(updatedCards);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const formatCardNumber = (number: string) => {
    if (number.length >= 4) {
      return '•••• •••• •••• ' + number.slice(-4);
    }
    return number;
  };

  const renderCardItem = ({ item }: { item: CardData }) => (
    <View style={styles.cardItem}>
      <View style={styles.cardInfo}>
        <CreditCard size={24} color={Colors.primary} />
        <View style={styles.cardDetails}>
          <Text style={styles.cardNumber}>{formatCardNumber(item.number)}</Text>
          <Text style={styles.cardName}>{item.name}</Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          onPress={() => handleEditCard(item)}
          style={styles.actionButton}
        >
          <Edit2 size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteCard(item.id)}
          style={styles.actionButton}
        >
          <Trash2 size={20} color={Colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar 
        title="Payment Methods" 
        showBackButton={true}
        onBackPress={onClose}
      />
      
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.addCardButton}
          onPress={() => setShowCardModal(true)}
        >
          <Plus size={24} color={Colors.primary} />
          <Text style={styles.addCardText}>Add New Card</Text>
        </TouchableOpacity>

        <FlatList
          data={cards}
          renderItem={renderCardItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cardsList}
        />

        <Modal
          visible={showCardModal}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {isEditing ? 'Edit Card' : 'Add New Card'}
                </Text>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={styles.closeButton}
                >
                  <X size={24} color={Colors.text.secondary} />
                </TouchableOpacity>
              </View>

              <Input
                label="Card Number"
                value={cardData.number}
                onChangeText={(text) => setCardData({ ...cardData, number: text })}
                keyboardType="numeric"
                maxLength={16}
              />

              <Input
                label="Cardholder Name"
                value={cardData.name}
                onChangeText={(text) => setCardData({ ...cardData, name: text })}
              />

              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <Input
                    label="Expiry Date"
                    value={cardData.expiry}
                    onChangeText={(text) => setCardData({ ...cardData, expiry: text })}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </View>

                <View style={styles.halfWidth}>
                  <Input
                    label="CVV"
                    value={cardData.cvv}
                    onChangeText={(text) => setCardData({ ...cardData, cvv: text })}
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>

              <Button
                title={isEditing ? 'Save Changes' : 'Add Card'}
                onPress={handleAddCard}
                style={styles.submitButton}
              />
            </View>
          </View>
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
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  addCardText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 12,
  },
  cardsList: {
    flexGrow: 1,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDetails: {
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
    marginTop: 4,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingTop: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.text.primary,
  },
  closeButton: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
  },
  submitButton: {
    marginTop: 8,
  },
});