import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Echinacea Plant',
    description: 'A beautiful flowering plant known for its immune-boosting properties. Perfect for both ornamental and medicinal gardens.',
    price: 15.00,
    category: 'Herbs',
    image: 'https://images.pexels.com/photos/2382325/pexels-photo-2382325.jpeg',
    rating: 4.5,
    reviews: 128
  },
  {
    id: '2',
    name: 'Chamomile Tea',
    description: 'Organic chamomile tea known for its calming properties and sweet, floral taste.',
    price: 12.99,
    category: 'Teas',
    image: 'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg',
    rating: 4.8,
    reviews: 256
  },
  {
    id: '3',
    name: 'Elderberry Tonic',
    description: 'A powerful immune-boosting tonic made from organic elderberries.',
    price: 24.99,
    category: 'Tonics',
    image: 'https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg',
    rating: 4.7,
    reviews: 89
  },
  {
    id: '4',
    name: 'Lavender Bundle',
    description: 'Fresh-cut lavender bundle, perfect for aromatherapy and decoration.',
    price: 18.50,
    category: 'Herbs',
    image: 'https://images.pexels.com/photos/6621472/pexels-photo-6621472.jpeg',
    rating: 4.6,
    reviews: 167
  },
  {
    id: '5',
    name: 'Mint Plant',
    description: 'Fresh organic mint plant, great for teas and cooking.',
    price: 9.99,
    category: 'Herbs',
    image: 'https://images.pexels.com/photos/2300265/pexels-photo-2300265.jpeg',
    rating: 4.4,
    reviews: 143
  },
  {
    id: '6',
    name: 'Green Tea Blend',
    description: 'Premium green tea blend with antioxidant properties.',
    price: 14.99,
    category: 'Teas',
    image: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg',
    rating: 4.9,
    reviews: 312
  }
];

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'herbs', name: 'Herbs' },
  { id: 'teas', name: 'Teas' },
  { id: 'tonics', name: 'Tonics' }
];