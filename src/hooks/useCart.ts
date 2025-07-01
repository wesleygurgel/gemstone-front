import { useState, useEffect, useCallback } from 'react';
import cartService from '../services/cartService';
import { AddToCartRequest, Cart, CartItem, UpdateCartItemRequest } from '../types/api';
import { handleApiError, getErrorMessage } from '../utils/errorHandler';
import { useAuth } from '../context/AuthContext';

/**
 * Hook for cart functionality
 */
export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  /**
   * Load the current user's cart
   */
  const loadCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const cartData = await cartService.getCurrentCart();
      setCart(cartData);
      setError(null);
    } catch (err) {
      const handledError = handleApiError(err);
      setError(getErrorMessage(handledError));
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load cart on initial mount and when authentication status changes
  useEffect(() => {
    loadCart();
  }, [loadCart, isAuthenticated]);

  /**
   * Add an item to the cart
   */
  const addItem = async (productId: number, quantity: number): Promise<boolean> => {
    if (!isAuthenticated) {
      setError('You must be logged in to add items to your cart');
      return false;
    }

    try {
      setLoading(true);
      await cartService.addItem({ product: productId, quantity });
      await loadCart(); // Reload the cart to get the updated state
      setError(null);
      return true;
    } catch (err) {
      const handledError = handleApiError(err);
      setError(getErrorMessage(handledError));
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update a cart item
   */
  const updateItem = async (itemId: number, quantity: number): Promise<boolean> => {
    if (!isAuthenticated) {
      setError('You must be logged in to update your cart');
      return false;
    }

    try {
      setLoading(true);
      await cartService.updateItem(itemId, { quantity });
      await loadCart(); // Reload the cart to get the updated state
      setError(null);
      return true;
    } catch (err) {
      const handledError = handleApiError(err);
      setError(getErrorMessage(handledError));
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Remove an item from the cart
   */
  const removeItem = async (itemId: number): Promise<boolean> => {
    if (!isAuthenticated) {
      setError('You must be logged in to remove items from your cart');
      return false;
    }

    try {
      setLoading(true);
      await cartService.removeItem(itemId);
      await loadCart(); // Reload the cart to get the updated state
      setError(null);
      return true;
    } catch (err) {
      const handledError = handleApiError(err);
      setError(getErrorMessage(handledError));
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear the cart
   */
  const clearCart = async (): Promise<boolean> => {
    if (!isAuthenticated) {
      setError('You must be logged in to clear your cart');
      return false;
    }

    try {
      setLoading(true);
      await cartService.clearCart();
      await loadCart(); // Reload the cart to get the updated state
      setError(null);
      return true;
    } catch (err) {
      const handledError = handleApiError(err);
      setError(getErrorMessage(handledError));
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Open the cart drawer
   */
  const openCart = () => {
    setIsCartOpen(true);
  };

  /**
   * Close the cart drawer
   */
  const closeCart = () => {
    setIsCartOpen(false);
  };

  /**
   * Toggle the cart drawer
   */
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return {
    cart,
    loading,
    error,
    isCartOpen,
    totalItems: cart?.total_items || 0,
    totalPrice: cart?.total_price || '0',
    addItem,
    updateItem,
    removeItem,
    clearCart,
    loadCart,
    openCart,
    closeCart,
    toggleCart,
  };
};