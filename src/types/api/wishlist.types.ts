import { Product } from './product.types';

/**
 * Wishlist item
 */
export interface WishlistItem {
  id: number;
  product: Product;
}

/**
 * Wishlist
 */
export interface Wishlist {
  id: number;
  items: WishlistItem[];
  total_items: number;
}

/**
 * Add to wishlist request payload
 */
export interface AddToWishlistRequest {
  product_id: number;
}

/**
 * Remove from wishlist request payload
 */
export interface RemoveFromWishlistRequest {
  product_id: number;
}