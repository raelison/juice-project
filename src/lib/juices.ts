import { type ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export interface Juice {
  id: string;
  name: string;
  description: string;
  price: string;
  image: ImagePlaceholder;
  nutritionalInfo: {
    calories: string;
    vitamins: string[];
  };
}

// Helper to get image by ID, with a fallback
const getImage = (id: string): ImagePlaceholder => {
    const image = PlaceHolderImages.find((img) => img.id === id);
    if (!image) {
      console.warn(`Image with id "${id}" not found.`);
      return { 
        id: 'fallback', 
        description: 'A placeholder fruit juice image',
        imageUrl: 'https://picsum.photos/seed/fallback/600/400', 
        imageHint: 'juice drink' 
      };
    }
    return image;
};

export const juices: Juice[] = [
  {
    id: 'orange-sunrise',
    name: 'Orange Sunrise',
    description: 'A classic, refreshing glass of pure sunshine, packed with Vitamin C.',
    price: '€3.50',
    image: getImage('orange-juice'),
    nutritionalInfo: {
      calories: '110 kcal',
      vitamins: ['C', 'A'],
    },
  },
  {
    id: 'green-vitality',
    name: 'Green Vitality',
    description: 'A healthy blend of spinach, apple, and cucumber for a vibrant energy boost.',
    price: '€4.00',
    image: getImage('green-juice'),
    nutritionalInfo: {
      calories: '95 kcal',
      vitamins: ['K', 'C', 'Iron'],
    },
  },
  {
    id: 'berry-bliss',
    name: 'Berry Bliss',
    description: 'A sweet and tangy mix of strawberries, blueberries, and raspberries.',
    price: '€4.50',
    image: getImage('berry-juice'),
    nutritionalInfo: {
      calories: '130 kcal',
      vitamins: ['C', 'Antioxidants'],
    },
  },
  {
    id: 'tropical-mix',
    name: 'Tropical Escape',
    description: 'Escape to paradise with this exotic blend of mango, pineapple, and passion fruit.',
    price: '€4.50',
    image: getImage('tropical-juice'),
    nutritionalInfo: {
      calories: '150 kcal',
      vitamins: ['A', 'C'],
    },
  },
];
