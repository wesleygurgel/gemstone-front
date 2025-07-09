import { ApiService } from './apiService';
import api from '../utils/api';
import { Wishlist, WishlistItem, AddToWishlistRequest, RemoveFromWishlistRequest } from '../types/api/wishlist.types';

/**
 * Service for managing wishlist operations
 */
class WishlistService extends ApiService<Wishlist> {
  private wishlistCache: Wishlist | null = null;
  private fetchPromise: Promise<Wishlist> | null = null;

  constructor() {
    super('/orders/wishlist');
  }

  /**
   * Get the user's wishlist
   * @returns Promise resolving to the user's wishlist
   */
  getUserWishlist = async (): Promise<Wishlist> => {
    // If we already have a fetch in progress, return that promise
    if (this.fetchPromise) {
      return this.fetchPromise;
    }

    // If we have cached data, return it
    if (this.wishlistCache) {
      return this.wishlistCache;
    }

    // Otherwise, fetch the data and cache it
    this.fetchPromise = this.customGet<Wishlist>('');

    try {
      this.wishlistCache = await this.fetchPromise;
      return this.wishlistCache;
    } finally {
      this.fetchPromise = null;
    }
  };

  /**
   * Add a product to the wishlist
   * @param productId The product ID to add
   * @returns Promise resolving to the added wishlist item
   */
  addToWishlist = async (productId: number): Promise<WishlistItem> => {
    const payload: AddToWishlistRequest = { product_id: productId };
    const result = await this.customPost<AddToWishlistRequest, WishlistItem>('add_item/', payload);

    // Invalidate cache after modifying the wishlist
    this.wishlistCache = null;

    return result;
  };

  /**
   * Remove a product from the wishlist
   * @param productId The product ID to remove
   * @returns Promise resolving to void
   */
  removeFromWishlist = async (productId: number): Promise<void> => {
    const payload: RemoveFromWishlistRequest = { product_id: productId };

    // The API uses DELETE method with a request body, which requires a custom implementation
    // since the ApiService doesn't have a customDelete method with body support
    const fullPath = `${this.endpoint}/remove_item/`;
    await api.delete(fullPath, { data: payload });

    // Invalidate cache after modifying the wishlist
    this.wishlistCache = null;
  };

  /**
   * Check if a product is in the wishlist
   * @param productId The product ID to check
   * @returns Promise resolving to a boolean indicating if the product is in the wishlist
   */
  isProductInWishlist = async (productId: number): Promise<boolean> => {
    try {
      const wishlist = await this.getUserWishlist();
      return wishlist.items.some(item => item.product.id === productId);
    } catch (error) {
      console.error('Error checking if product is in wishlist:', error);
      return false;
    }
  };
}

// Create a singleton instance
const wishlistService = new WishlistService();

export default wishlistService;
