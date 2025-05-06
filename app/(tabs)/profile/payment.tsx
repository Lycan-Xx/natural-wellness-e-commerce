import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { CreditCard, Plus, Edit2, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';

export default function PaymentMethodsScreen() {
  const [showCardModal, setShowCardModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardData, setCardData] = useState({
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
    // Basic validation
    if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
      Alert.alert('Missing Information', 'Please fill in all the fields.');
      return;
    }

    if (isEditing) {
      // Update existing card
      const updatedCards = cards.map(card => 
        card.id === cardData.id ? cardData : card
      );
      setCards(updatedCards);
    } else {
      // Add new card with unique ID
      const newCard = {
        ...cardData,
        id: Date.now().toString(),
      };
      setCards([...cards, newCard]);
    }
    
    handleCloseModal();
  };

  const handleEditCard = (card) => {
    setCardData(card);
    setIsEditing(true);
    setShowCardModal(true);
  };

  const handleDeleteCard = (cardId) => {
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

  const formatCardNumber = (number) => {
    // Show only last 4 digits for security
    if (number.length >= 4) {
      return '•••• •••• •••• ' + number.slice(-4);
    }
    return number;
  };

  const renderCardItem = ({ item }) => (
    <View style={styles.cardItem}>
      <View style={styles.cardItemContent}>
        <CreditCard size={24} color={Colors.primary} />
        <View style={styles.cardDetails}>
          <Text style={styles.cardNumber}>{formatCardNumber(item.number)}</Text>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardExpiry}>Expires: {item.expiry}</Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleEditCard(item)}
        >
          <Edit2 size={18} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => handleDeleteCard(item.id)}
        >
          <Trash2 size={18} color="#FF4747" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <CreditCard size={48} color={Colors.text.secondary} />
      <Text style={styles.emptyStateText}>No payment cards added yet</Text>
      <Text style={styles.emptyStateSubText}>
        Add a card to make checkout faster
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="Payment Methods" />
      
      <View style={styles.content}>
        <FlatList
          data={cards}
          renderItem={renderCardItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cardsList}
          ListEmptyComponent={renderEmptyState}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            resetCardForm();
            setShowCardModal(true);
          }}
        >
          <Plus size={24} color={Colors.white} />
          <Text style={styles.addButtonText}>Add New Card</Text>
        </TouchableOpacity>

        {/* Card Modal */}
        <Modal
          visible={showCardModal}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <SafeAreaView style={styles.modalContainer}>
            <HeaderBar
              title={isEditing ? "Edit Card" : "Add Card"}
              showBackButton={true}
              onBackPress={handleCloseModal}
            />
            
            <View style={styles.modalContent}>
              <Input
                label="Card Number"
                value={cardData.number}
                onChangeText={(text) => setCardData({ ...cardData, number: text })}
                keyboardType="numeric"
                placeholder="1234 5678 9012 3456"
                maxLength={16}
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
                  maxLength={5}
                />

                <Input
                  label="CVV"
                  value={cardData.cvv}
                  onChangeText={(text) => setCardData({ ...cardData, cvv: text })}
                  placeholder="123"
                  containerStyle={{ flex: 1, marginLeft: 8 }}
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry={true}
                />
              </View>

              <Button
                title={isEditing ? "Update Card" : "Save Card"}
                onPress={handleAddCard}
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
    flex: 1,
    padding: 20,
  },
  cardsList: {
    flexGrow: 1,
  },
  cardItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  cardItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardDetails: {
    marginLeft: 12,
    flex: 1,
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
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.text.primary,
    marginTop: 16,
    textAlign: 'center',
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
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 12,
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
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 24,
  },
});