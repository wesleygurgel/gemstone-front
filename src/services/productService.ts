import { ApiService } from './apiService';
import { Product, ProductCreate, ProductUpdate } from '../types/api';

/**
 * Service for product-related API operations
 */
class ProductService extends ApiService<Product, ProductCreate, ProductUpdate> {
  constructor() {
    // Pass the endpoint to the parent class
    super('/products/products');
  }

  /**
   * Get featured products
   * @returns Promise resolving to an array of featured products
   */
  getFeaturedProducts = async (): Promise<Product[]> => {
    return this.customGet<Product[]>('featured/');
  };

  /**
   * Get products by category
   * @param categoryId The category ID
   * @returns Promise resolving to an array of products in the category
   */
  getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
    return this.customGet<Product[]>(`by-category/${categoryId}/`);
  };

  /**
   * Search products
   * @param query The search query
   * @returns Promise resolving to an array of matching products
   */
  searchProducts = async (query: string): Promise<Product[]> => {
    return this.customGet<Product[]>('search/', { query });
  };
}

// Create a singleton instance
const productService = new ProductService();

export default productService;