import { ApiService } from './apiService';
import { AddToCartRequest, AddToCartResponse, Cart, CartItem, UpdateCartItemRequest } from '../types/api';

/**
 * Service for cart-related API operations
 */
class CartService extends ApiService<Cart> {
  private cartId: number | null = null;

  constructor() {
    // Pass the endpoint to the parent class
    super('/orders/carts');
  }

  /**
   * Get the current user's cart
   * @returns Promise resolving to the user's cart
   */
  getCurrentCart = async (): Promise<Cart> => {
    const carts = await this.getAll();
    if (carts && carts.length > 0) {
      this.cartId = carts[0].id;
      return carts[0];
    }
    return {} as Cart;
  };

  /**
   * Add an item to the cart
   * @param data The item data to add
   * @returns Promise resolving to the added cart item
   */
  addItem = async (data: AddToCartRequest): Promise<AddToCartResponse> => {
    if (!this.cartId) {
      await this.getCurrentCart();
    }
    return this.customPost<AddToCartRequest, AddToCartResponse>(`${this.cartId}/add_item/`, data);
  };

  /**
   * Update a cart item
   * @param itemId The cart item ID
   * @param data The update data
   * @returns Promise resolving to the updated cart item
   */
  updateItem = async (itemId: number, data: UpdateCartItemRequest): Promise<CartItem> => {
    if (!this.cartId) {
      await this.getCurrentCart();
    }
    return this.customPost<{ item_id: number, quantity: number }, CartItem>(
      `${this.cartId}/update_item/`, 
      { item_id: itemId, quantity: data.quantity }
    );
  };

  /**
   * Remove an item from the cart
   * @param itemId The cart item ID
   * @returns Promise resolving to void
   */
  removeItem = async (itemId: number): Promise<void> => {
    if (!this.cartId) {
      await this.getCurrentCart();
    }
    await this.customPost(`${this.cartId}/remove_item/`, { item_id: itemId });
  };

  /**
   * Clear the cart
   * @returns Promise resolving to the empty cart
   */
  clearCart = async (): Promise<Cart> => {
    if (!this.cartId) {
      await this.getCurrentCart();
    }
    // If there's no specific endpoint for clearing the cart, we can remove items one by one
    const cart = await this.getCurrentCart();
    for (const item of cart.items || []) {
      await this.removeItem(item.id);
    }
    return this.getCurrentCart();
  };
}

// Create a singleton instance
const cartService = new CartService();

export default cartService;
