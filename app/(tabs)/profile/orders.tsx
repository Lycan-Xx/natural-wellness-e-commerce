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
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import HeaderBar from '@/components/HeaderBar';
import { products } from '@/data/products';

type OrderStatus = 'on-transit' | 'arrived' | 'canceled';

interface Order {
  id: string;
  productId: string;
  date: string;
  status: OrderStatus;
  quantity: number;
}

// Mock orders data
const orders: Order[] = [
  { id: '1', productId: '1', date: 'Mei 26, 2023', status: 'on-transit', quantity: 1 },
  { id: '2', productId: '2', date: 'Mei 26, 2023', status: 'arrived', quantity: 1 },
  { id: '3', productId: '3', date: 'Mei 25, 2023', status: 'canceled', quantity: 1 },
  { id: '4', productId: '4', date: 'Mei 25, 2023', status: 'on-transit', quantity: 1 },
  { id: '5', productId: '5', date: 'Mei 25, 2023', status: 'arrived', quantity: 1 },
  { id: '6', productId: '6', date: 'Mei 24, 2023', status: 'canceled', quantity: 1 },
];

export default function OrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<OrderStatus>('on-transit');

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'on-transit':
        return '#FFA500';
      case 'arrived':
        return Colors.success;
      case 'canceled':
        return Colors.error;
      default:
        return Colors.text.secondary;
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'on-transit':
        return 'On Transit';
      case 'arrived':
        return 'Arrived';
      case 'canceled':
        return 'Canceled';
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter(order => order.status === activeTab);

  const OrderItem = ({ order }: { order: Order }) => {
    const product = products.find(p => p.id === order.productId);
    if (!product) return null;

    return (
      <View style={styles.orderItem}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.orderDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.orderInfo}>Size: Medium Qty: {order.quantity}</Text>
          <View style={styles.orderFooter}>
            <Text style={styles.orderDate}>{order.date}</Text>
            <View 
              style={[
                styles.statusTag, 
                { backgroundColor: getStatusColor(order.status) + '20' }
              ]}
            >
              <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                {getStatusText(order.status)}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar 
        title="My Orders" 
        showBackButton 
        onBackPress={() => router.back()} 
      />

      <View style={styles.tabsContainer}>
        {(['on-transit', 'arrived', 'canceled'] as OrderStatus[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {getStatusText(tab)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {filteredOrders.map(order => (
          <OrderItem key={order.id} order={order} />
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
  tabsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  activeTabText: {
    color: Colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  orderInfo: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 12,
  },
});
