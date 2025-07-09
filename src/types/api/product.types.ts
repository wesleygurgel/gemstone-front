/**
 * Product related type definitions
 */

/**
 * Product image
 */
export interface ProductImage {
  id: number;
  image: string;
  alt_text: string;
  is_main?: boolean;
}

/**
 * Product category
 */
export interface Category {
  id: number;
  name: string;
  description?: string;
  slug: string;
  image?: string | null;
}

/**
 * Category creation payload
 */
export interface CategoryCreate {
  name: string;
  description: string;
}

/**
 * Category response
 */
export interface CategoryResponse {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
}

/**
 * Product list item (summary)
 */
export interface ProductListItem {
  id: number;
  name: string;
  slug: string;
  price: string;
  price_discount?: string;
  available: boolean;
  category: number;
  category_name: string;
  featured: boolean;
  view_count: number;
  sales_count: number;
  main_image?: {
    id: number;
    image: string;
    alt_text: string;
  };
}

/**
 * Product detail model
 */
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  price_discount?: string;
  stock: number;
  available: boolean;
  category: number;
  category_name: string;
  featured: boolean;
  view_count: number;
  sales_count: number;
  images: ProductImage[];
  main_image?: {
    id: number;
    image: string;
    alt_text: string;
  };
  created_at: string;
  updated_at: string;
}

/**
 * Product creation payload
 */
export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  price_discount?: number;
  stock: number;
  available: boolean;
  category: number;
  featured: boolean;
}

/**
 * Product creation response
 */
export interface ProductCreateResponse {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  price_discount?: string;
  stock: number;
  available: boolean;
  category: number;
  category_name: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Product update payload
 */
export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  price_discount?: number;
  stock?: number;
  available?: boolean;
  category?: number;
  featured?: boolean;
}
