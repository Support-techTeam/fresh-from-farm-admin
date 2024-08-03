import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the Product and CartItem interfaces
interface Product {
  id: number;
  name: string;
  price_qty: number;
  price: number;
  discount: string;
  unit: string;
  imageSrc: string;
  imageAlt: string;
  bestSeller: boolean;
  specialOffer: boolean;
  createdAt: string;
  updatedAt: string;
  size: string;
  origin: string;
  product_code: string;
  category: string;
  availiableQty: number;
  criticalQty: number;
  tax: number;
  reviews: {
    name: string;
    rating: number;
    createdAt: string;
    text: string;
  }[];
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

// Define the Cart Context interface
interface CartContextType {
  cart: CartItem[];
  totalQuantity: number;
  addItem: (item: Product, quantity: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
}

// Create the Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('f3_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('f3_cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem,
        );
      }
      return [...prevCart, { ...item, quantity: quantity }];
    });
  };

  const updateItemQuantity = (itemId: any, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + quantity) }
          : item,
      ),
    );
  };

  const removeItem = (itemId: any) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalQuantity = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the Cart Context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
