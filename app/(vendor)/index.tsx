import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Package, ShoppingBag, CircleUser as UserCircle, DollarSign } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';
import VendorProfileScreen from './profile';

// Mock transaction data
const transactions = [
  { id: '1', title: 'Echinacea Plant', date: 'Today', amount: -10.00, type: 'sale' },
  { id: '2', title: 'Order', date: 'Yesterday', amount: -12.00, type: 'sale' },
  { id: '3', title: 'Deposit', date: 'May 10', amount: 20.00, type: 'deposit' },
];

export default function VendorDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfilePress = () => {
    setShowProfileModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={handleProfilePress}>
            <UserCircle size={24} color={Colors.text.secondary} />
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
            <Text style={styles.balanceAmount}>2,458.50</Text>
          </View>
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
            onPress={() => setShowProductsModal(true)}
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
          <View style={styles.modalContent}>
            <Text>Products management content goes here</Text>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Orders Modal */}
      <Modal
        visible={showOrdersModal}
        animationType="slide"
        onRequestClose={() => setShowOrdersModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Orders management content goes here</Text>
          </View>
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
});