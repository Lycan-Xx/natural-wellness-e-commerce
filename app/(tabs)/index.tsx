import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { products } from '@/data/products';

// Mock orders data
const orders = [
  {
    id: '1',
    productId: '1',
    status: 'In Progress',
    total: 30.00,
  },
  {
    id: '2',
    productId: '7',
    status: 'Delivered',
    total: 25.00,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleTrackOrder = (orderId: string) => {
    // Navigate to profile page and open tracking modal
    router.push({ pathname: '/profile', params: { tracking: orderId } });
  };

  const handleShopNow = () => {
    router.push('/(tabs)/browse');
  };

  const renderPopularItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.popularItem}
      onPress={() => router.push('/(tabs)/browse')}
    >
      <Image source={{ uri: item.image }} style={styles.popularImage} />
      <View style={styles.popularInfo}>
        <Text style={styles.popularName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.popularPriceRow}>
          <Text style={styles.popularPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderOrderItem = ({ item }) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return null;

    return (
      <View style={styles.orderItem}>
        <Image source={{ uri: product.image }} style={styles.orderImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.orderName}>{product.name}</Text>
          <Text style={styles.orderPrice}>${item.total.toFixed(2)}</Text>
          <View style={styles.orderStatusContainer}>
            <Text 
              style={[
                styles.orderStatus,
                { color: item.status === 'Delivered' ? Colors.success : Colors.primary }
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
        <Button
          title="Track order"
          onPress={() => handleTrackOrder(item.id)}
          variant="outline"
          size="small"
          style={styles.trackButton}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>{user?.fullName}</Text>
        </View>

        {/* Today's Offer */}
        <TouchableOpacity 
          style={styles.offerCard}
          onPress={handleShopNow}
          activeOpacity={0.9}
        >
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/3644742/pexels-photo-3644742.jpeg' }} 
            style={styles.offerBackground}
          />
          <View style={styles.offerContent}>
            <Text style={styles.offerTitle}>Today's offer</Text>
            <Text style={styles.offerText}>Get The Best Categories{'\n'}Of Plants</Text>
            <Button 
              title="Order Now" 
              onPress={handleShopNow}
              style={styles.offerButton}
            />
          </View>
        </TouchableOpacity>

        {/* Popular Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Most popular</Text>
          <TouchableOpacity 
            style={styles.seeAllButton}
            onPress={() => router.push('/(tabs)/browse')}
          >
            <Text style={styles.seeAllText}>See all</Text>
            <ArrowRight size={20} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={products.slice(0, 5)}
          renderItem={renderPopularItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularList}
          snapToInterval={200}
          decelerationRate="fast"
        />

        {/* My Orders */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My orders</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => router.push('/profile/orders')}
          >
            <Text style={styles.seeAllText}>See all</Text>
            <ArrowRight size={20} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          scrollEnabled={false}
          contentContainerStyle={styles.ordersList}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
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
  offerCard: {
    margin: 20,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E8F5E9',
  },
  offerBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  offerContent: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  offerTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  offerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  offerButton: {
    width: 120,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.text.primary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
    marginRight: 4,
  },
  popularList: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  popularItem: {
    width: 180,
    marginRight: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  popularImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  popularInfo: {
    padding: 12,
  },
  popularName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  popularPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  ordersList: {
    padding: 20,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  orderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  orderName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text.primary,
  },
  orderPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.primary,
    marginTop: 4,
  },
  orderStatusContainer: {
    marginTop: 4,
  },
  orderStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  trackButton: {
    marginLeft: 12,
  },
});