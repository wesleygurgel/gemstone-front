import { useState, useEffect, useCallback } from 'react';
import wishlistService from '../services/wishlistService';
import { Wishlist } from '../types/api/wishlist.types';
import { handleApiError, getErrorMessage } from '../utils/errorHandler';
import { useAuth } from '../context/AuthContext';

/**
 * Hook for wishlist functionality
 */
export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  /**
   * Load the current user's wishlist
   */
  const loadWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlist(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const wishlistData = await wishlistService.getUserWishlist();
      setWishlist(wishlistData);
      setError(null);
    } catch (err) {
      const handledError = handleApiError(err);
      setError(getErrorMessage(handledError));
      setWishlist(null);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load wishlist on initial mount and when authentication status changes
  useEffect(() => {
    loadWishlist();
  }, [loadWishlist, isAuthenticated]);

  /**
   * Add an item to the wishlist
   */
  const addItem = async (productId: number): Promise<boolean> => {
    if (!isAuthenticated) {
      setError('You must be logged in to add items to your wishlist');
      return false;
    }

    try {
      setLoading(true);
      await wishlistService.addToWishlist(productId);
      await loadWishlist(); // Reload the wishlist to get the updated state
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
   * Remove an item from the wishlist
   */
  const removeItem = async (productId: number): Promise<boolean> => {
    if (!isAuthenticated) {
      setError('You must be logged in to remove items from your wishlist');
      return false;
    }

    try {
      setLoading(true);
      await wishlistService.removeFromWishlist(productId);
      await loadWishlist(); // Reload the wishlist to get the updated state
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
   * Toggle an item in the wishlist (add if not present, remove if present)
   */
  const toggleItem = async (productId: number): Promise<boolean> => {
    if (!isAuthenticated) {
      setError('You must be logged in to update your wishlist');
      return false;
    }

    try {
      setLoading(true);
      const isInWishlist = await isItemInWishlist(productId);

      if (isInWishlist) {
        await wishlistService.removeFromWishlist(productId);
      } else {
        await wishlistService.addToWishlist(productId);
      }

      await loadWishlist(); // Reload the wishlist to get the updated state
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
   * Check if an item is in the wishlist
   */
  const isItemInWishlist = async (productId: number): Promise<boolean> => {
    if (!isAuthenticated || !wishlist) {
      return false;
    }

    return wishlist.items.some(item => item.product.id === productId);
  };

  return {
    wishlist,
    loading,
    error,
    totalItems: wishlist?.total_items || 0,
    addItem,
    removeItem,
    toggleItem,
    isItemInWishlist,
    loadWishlist,
  };
};
