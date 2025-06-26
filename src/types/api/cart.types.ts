/**
 * Cart related type definitions
 */
import { ProductListItem } from './product.types';

/**
 * Cart item
 */
export interface CartItem {
  id: number;
  product: number;
  product_details: ProductListItem;
  quantity: number;
  total_price: string;
}

/**
 * Add to cart request
 */
export interface AddToCartRequest {
  product: number;
  quantity: number;
}

/**
 * Add to cart response
 */
export interface AddToCartResponse {
  id: number;
  product: number;
  product_details: ProductListItem;
  quantity: number;
  total_price: string;
}

/**
 * Cart
 */
export interface Cart {
  id: number;
  user: number;
  items: CartItem[];
  total_price: string;
  total_items: number;
  created_at: string;
  updated_at: string;
}

/**
 * Update cart item request
 */
export interface UpdateCartItemRequest {
  quantity: number;
}