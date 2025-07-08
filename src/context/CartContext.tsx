import React, { createContext, useContext, ReactNode } from 'react';
import { useCart as useCartHook } from '@/hooks/useCart';
import { Cart } from '@/types/api';

// Define the shape of the context
interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  isCartOpen: boolean;
  totalItems: number;
  totalPrice: string;
  addItem: (productId: number, quantity: number) => Promise<boolean>;
  updateItem: (itemId: number, quantity: number) => Promise<boolean>;
  removeItem: (itemId: number) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  loadCart: () => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cart = useCartHook();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
