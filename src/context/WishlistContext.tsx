import React, { createContext, useContext, ReactNode } from 'react';
import { useWishlist as useWishlistHook } from '@/hooks/useWishlist';
import { Wishlist } from '@/types/api/wishlist.types';

// Define the shape of the context
interface WishlistContextType {
  wishlist: Wishlist | null;
  loading: boolean;
  error: string | null;
  totalItems: number;
  addItem: (productId: number) => Promise<boolean>;
  removeItem: (productId: number) => Promise<boolean>;
  toggleItem: (productId: number) => Promise<boolean>;
  isItemInWishlist: (productId: number) => Promise<boolean>;
  loadWishlist: () => Promise<void>;
}

// Create the context with a default value
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Provider component
export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const wishlistHook = useWishlistHook();

  return (
    <WishlistContext.Provider value={wishlistHook}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the wishlist context
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};