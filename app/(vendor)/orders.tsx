import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import HeaderBar from '@/components/HeaderBar';

const mockOrders = [
  {
    id: '101',
    customer: 'Alice Johnson',
    product: 'Aloe Vera',
    price: 200,
    status: 'Delivered',
    date: '2024-06-01',
    image: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg',
  },
  {
    id: '102',
    customer: 'Bob Smith',
    product: 'Lavender Oil',
    price: 500,
    status: 'Pending',
    date: '2024-06-02',
    image: 'https://images.pexels.com/photos/6621472/pexels-photo-6621472.jpeg',
  },
  {
    id: '103',
    customer: 'Carol Lee',
    product: 'Chamomile Tea',
    price: 150,
    status: 'Shipped',
    date: '2024-06-03',
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
  },
];

export default function OrdersScreen({ onClose }: { onClose: () => void }) {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        title="Orders"
        showBackButton
        onBackPress={onClose}
      />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {mockOrders.map(order => (
          <View key={order.id} style={styles.orderCard}>
            <Image source={{ uri: order.image }} style={styles.productImage} />
            <View style={styles.orderInfo}>
              <Text style={styles.productName}>{order.product}</Text>
              <Text style={styles.customerName}>Customer: {order.customer}</Text>
              <Text style={styles.orderDate}>Date: {order.date}</Text>
              <Text style={styles.orderStatus}>Status: <Text style={[
                styles.statusText,
                order.status === 'Delivered' ? styles.statusDelivered :
                order.status === 'Pending' ? styles.statusPending :
                styles.statusShipped
              ]}>{order.status}</Text></Text>
              <Text style={styles.productPrice}>${order.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  orderCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'flex-start',
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: Colors.border,
  },
  orderInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 2,
  },
  customerName: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  orderStatus: {
    fontSize: 13,
    marginBottom: 2,
  },
  statusText: {
    fontWeight: 'bold',
  },
  statusDelivered: {
    color: Colors.success,
  },
  statusPending: {
    color: Colors.warning,
  },
  statusShipped: {
    color: Colors.primary,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text.primary,
    marginTop: 4,
  },
});
