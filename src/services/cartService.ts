import { ApiService } from './apiService';
import { AddToCartRequest, AddToCartResponse, Cart, CartItem, UpdateCartItemRequest } from '../types/api';

/**
 * Service for cart-related API operations
 */
class CartService extends ApiService<Cart> {
  constructor() {
    // Pass the endpoint to the parent class
    super('/carts/cart');
  }

  /**
   * Get the current user's cart
   * @returns Promise resolving to the user's cart
   */
  getCurrentCart = async (): Promise<Cart> => {
    return this.customGet<Cart>('current/');
  };

  /**
   * Add an item to the cart
   * @param data The item data to add
   * @returns Promise resolving to the added cart item
   */
  addItem = async (data: AddToCartRequest): Promise<AddToCartResponse> => {
    return this.customPost<AddToCartRequest, AddToCartResponse>('items/', data);
  };

  /**
   * Update a cart item
   * @param itemId The cart item ID
   * @param data The update data
   * @returns Promise resolving to the updated cart item
   */
  updateItem = async (itemId: number, data: UpdateCartItemRequest): Promise<CartItem> => {
    return this.customPost<UpdateCartItemRequest, CartItem>(`items/${itemId}/`, data);
  };

  /**
   * Remove an item from the cart
   * @param itemId The cart item ID
   * @returns Promise resolving to void
   */
  removeItem = async (itemId: number): Promise<void> => {
    await this.customPost(`items/${itemId}/remove/`);
  };

  /**
   * Clear the cart
   * @returns Promise resolving to the empty cart
   */
  clearCart = async (): Promise<Cart> => {
    return this.customPost<void, Cart>('clear/');
  };
}

// Create a singleton instance
const cartService = new CartService();

export default cartService;