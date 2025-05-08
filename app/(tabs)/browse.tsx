import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Check } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';
import { products, categories } from '@/data/products';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

export default function BrowseScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState(false);

  // Animation values: opacity, scale, checkmark opacity
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const checkmarkOpacity = useRef(new Animated.Value(0)).current;

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase() === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductPress = useCallback((product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
  }, []);

  const handleQuantityChange = (increment: number) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Enhanced success animation: scale bounce & fade transitions
  const playAddToCartAnimation = () => {
    setAddingToCart(true);

    Animated.sequence([
      // Fade out text, scale up button, fade in check
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(checkmarkOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(buttonScale, {
          toValue: 1.1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]),
      // Bounce back to original size
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      // Hold for a moment
      Animated.delay(1200),
      // Reset to initial state
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(checkmarkOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setAddingToCart(false);
    });
  };

  const handleAddToCart = () => {
    if (selectedProduct && !addingToCart) {
      addToCart(selectedProduct, quantity);
      playAddToCartAnimation();
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id.toLowerCase() && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(item.id.toLowerCase())}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === item.id.toLowerCase() && styles.categoryButtonTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={20} color={Colors.text.secondary} />}
          containerStyle={styles.searchInput}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View style={styles.productCardContainer}>
            <ProductCard product={item} onPress={handleProductPress} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={!!selectedProduct}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        {selectedProduct && (
          <SafeAreaView style={styles.modalContainer}>
            <HeaderBar 
              title={selectedProduct.name} 
              showBackButton={true}
              onBackPress={handleCloseModal}
            />
            
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
              
              <View style={styles.detailsContainer}>
                <Text style={styles.name}>{selectedProduct.name}</Text>
                <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
                
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Quantity</Text>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleQuantityChange(-1)}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleQuantityChange(1)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalPrice}>
                    ${(selectedProduct.price * quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.footer}>
              <Animated.View
                style={[
                  styles.addToCartButton,
                  addingToCart && styles.addToCartButtonSuccess,
                  { transform: [{ scale: buttonScale }] },
                ]}
              >
                <TouchableOpacity
                  style={StyleSheet.absoluteFill}
                  onPress={handleAddToCart}
                  disabled={addingToCart}
                />
                <Animated.Text 
                  style={[styles.addToCartButtonText, { opacity: buttonOpacity }]}
                >
                  Add to Cart
                </Animated.Text>
                <Animated.View 
                  style={[styles.checkmarkContainer, { opacity: checkmarkOpacity }]}>
                  <Check size={24} color={Colors.white} />
                </Animated.View>
              </Animated.View>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F1E9' },
  header: { padding: 16, backgroundColor: Colors.white },
  searchInput: { marginBottom: 0 },
  categoriesContainer: { backgroundColor: Colors.white, paddingBottom: 16 },
  categoriesList: { paddingHorizontal: 16 },
  categoryButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.background, marginRight: 8 },
  categoryButtonActive: { backgroundColor: Colors.primary },
  categoryButtonText: { fontFamily: 'Poppins-Medium', fontSize: 14, color: Colors.text.secondary },
  categoryButtonTextActive: { color: Colors.white },
  productGrid: { padding: 16 },
  productRow: { justifyContent: 'space-between' },
  productCardContainer: { width: '48%', marginBottom: 16 },
  modalContainer: { flex: 1, backgroundColor: Colors.background },
  modalContent: { paddingBottom: 100 },
  modalImage: { width: '100%', height: 300, resizeMode: 'cover' },
  detailsContainer: { padding: 20, backgroundColor: Colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -24 },
  name: { fontFamily: 'Poppins-Bold', fontSize: 24, color: Colors.text.primary, marginBottom: 8 },
  price: { fontFamily: 'Poppins-Bold', fontSize: 20, color: Colors.primary, marginBottom: 16 },
  description: { fontFamily: 'Poppins-Regular', fontSize: 14, color: Colors.text.secondary, lineHeight: 22, marginBottom: 24 },
  quantityContainer: { marginBottom: 24 },
  quantityLabel: { fontFamily: 'Poppins-Medium', fontSize: 16, color: Colors.text.primary, marginBottom: 12 },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { width: 40, height: 40, backgroundColor: Colors.background, borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  quantityButtonText: { fontFamily: 'Poppins-Bold', fontSize: 20, color: Colors.text.primary },
  quantityText: { fontFamily: 'Poppins-Medium', fontSize: 16, color: Colors.text.primary, marginHorizontal: 20 },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  totalLabel: { fontFamily: 'Poppins-Medium', fontSize: 16, color: Colors.text.primary },
  totalPrice: { fontFamily: 'Poppins-Bold', fontSize: 24, color: Colors.primary },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.white, padding: 20, borderTopWidth: 1, borderTopColor: Colors.border },
  addToCartButton: { backgroundColor: Colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  addToCartButtonSuccess: { backgroundColor: '#4CAF50' },
  addToCartButtonText: { color: Colors.white, fontFamily: 'Poppins-Bold', fontSize: 16 },
  checkmarkContainer: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
});
