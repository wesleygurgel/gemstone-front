/**
 * Product related type definitions
 */

/**
 * Product category
 */
export interface Category {
  id: number;
  name: string;
  description?: string;
  slug: string;
}

/**
 * Product model
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  category: Category;
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  image_url?: string;
  slug: string;
}

/**
 * Product creation payload
 */
export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  category_id: number;
  stock: number;
  is_active?: boolean;
  image_url?: string;
}

/**
 * Product update payload
 */
export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  discount_price?: number | null;
  category_id?: number;
  stock?: number;
  is_active?: boolean;
  image_url?: string | null;
}