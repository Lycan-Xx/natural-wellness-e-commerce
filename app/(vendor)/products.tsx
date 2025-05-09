import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, X, Plus, Edit2, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';
import Input from '@/components/Input';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductsScreen({ onClose }: { onClose: () => void }) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Aloe Vera',
      price: 200,
      image: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg',
    },
    {
      id: '2',
      name: 'Lavender Oil',
      price: 500,
      image: 'https://images.pexels.com/photos/6621472/pexels-photo-6621472.jpeg',
    },
    {
      id: '3',
      name: 'Chamomile Tea',
      price: 150,
      image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
    },
    {
      id: '4',
      name: 'Peppermint Balm',
      price: 250,
      image: 'https://images.pexels.com/photos/678414/pexels-photo-678414.jpeg',
    },
    {
      id: '5',
      name: 'Eucalyptus Oil',
      price: 350,
      image: 'https://images.pexels.com/photos/161599/pexels-photo-161599.jpeg',
    },
    {
      id: '6',
      name: 'Rose Water',
      price: 180,
      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
    },
    {
      id: '7',
      name: 'Turmeric Powder',
      price: 120,
      image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg',
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
    });
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
    });
    setShowAddModal(true);
  };

  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setProducts(products.filter(p => p.id !== productId));
          },
        },
      ]
    );
  };

  const pickImage = async (type: 'camera' | 'gallery') => {
    try {
      let result;
      
      if (type === 'camera') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Camera permission is required');
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Gallery permission is required');
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets[0].uri) {
        setFormData(prev => ({ ...prev, image: result.assets[0].uri }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.image) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (editingProduct) {
        setProducts(products.map(p =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                price: parseFloat(formData.price),
                image: formData.image,
              }
            : p
        ));
      } else {
        const newProduct: Product = {
          id: Date.now().toString(),
          name: formData.name,
          price: parseFloat(formData.price),
          image: formData.image,
        };
        setProducts([...products, newProduct]);
      }
      setIsLoading(false);
      setShowAddModal(false);
      resetForm();
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        title="Manage Products"
        showBackButton
        onBackPress={onClose}
      />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddProduct}
        >
          <Plus size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>

        {products.map(product => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  onPress={() => handleEditProduct(product)}
                  style={styles.editButton}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteProduct(product.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <Image source={{ uri: product.image }} style={styles.productImage} />
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={showAddModal}
        animationType="slide"
        onRequestClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <HeaderBar
            title={editingProduct ? 'Edit Product' : 'Add Product'}
            showBackButton
            onBackPress={() => {
              setShowAddModal(false);
              resetForm();
            }}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <ScrollView style={styles.modalContent}>
              <TouchableOpacity
                style={[
                  styles.imageUpload,
                  formData.image ? styles.imagePreviewContainer : null,
                ]}
                onPress={() => {
                  Alert.alert('Choose Image', 'Select image source', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Camera', onPress: () => pickImage('camera') },
                    { text: 'Gallery', onPress: () => pickImage('gallery') },
                  ]);
                }}
              >
                {formData.image ? (
                  <Image
                    source={{ uri: formData.image }}
                    style={styles.imagePreview}
                  />
                ) : (
                  <View style={styles.uploadPlaceholder}>
                    <Camera size={40} color={Colors.text.secondary} />
                    <Text style={styles.uploadText}>Upload Product Image</Text>
                  </View>
                )}
              </TouchableOpacity>

              <Input
                label="Product Name"
                value={formData.name}
                onChangeText={text => setFormData(prev => ({ ...prev, name: text }))}
                placeholder="Enter product name"
              />

              <Input
                label="Price"
                value={formData.price}
                onChangeText={text => {
                  // Only allow numbers and decimal point
                  const filtered = text.replace(/[^0-9.]/g, '');
                  setFormData(prev => ({ ...prev, price: filtered }));
                }}
                placeholder="0"
                keyboardType="decimal-pad"
              />

              <Button
                title={editingProduct ? 'Save Changes' : 'Add Product'}
                onPress={handleSave}
                isLoading={isLoading}
                style={styles.submitButton}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#19703E',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16, // reduced from 100 to 1
    marginBottom: 24,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row', // to align icon and text horizontally
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    justifyContent: 'space-between',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  editButton: {
    backgroundColor: '#B6F5C6', // light green
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#FFB6B6', // light red
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContent: {
    padding: 20,
  },
  imageUpload: {
    width: '100%',
    height: 200,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imagePreviewContainer: {
    padding: 0,
  },
  uploadPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 40,
  },
});