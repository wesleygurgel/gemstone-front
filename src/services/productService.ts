import { ApiService } from './apiService';
import {
  Product,
  ProductCreate,
  ProductCreateResponse,
  ProductUpdate,
  ProductListItem,
  Category,
  CategoryCreate,
  CategoryResponse
} from '../types/api';

/**
 * Service for product-related API operations
 */
class ProductService extends ApiService<Product, ProductCreate, ProductUpdate> {
  constructor() {
    // Pass the endpoint to the parent class
    super('/products/products');
  }

  /**
   * Get products with pagination and filtering
   * @param params Filter parameters
   * @returns Promise resolving to an array of products
   */
  getProducts = async (params?: {
    category_id?: number | string;
    min_price?: number;
    max_price?: number;
    product_type?: string;
    weight?: string;
    sort?: string;
    available?: boolean;
    featured?: boolean;
    search?: string;
  }): Promise<ProductListItem[]> => {
    const response = await this.getAll(params);
    return response;
  };

  /**
   * Get featured products
   * @returns Promise resolving to an array of featured products
   */
  getFeaturedProducts = async (): Promise<ProductListItem[]> => {
    return this.customGet<ProductListItem[]>('featured/');
  };

  /**
   * Search products
   * @param query The search query
   * @returns Promise resolving to an array of matching products
   */
  searchProducts = async (query: string): Promise<ProductListItem[]> => {
    return this.getAll({ search: query });
  };

  /**
   * Get a product by slug
   * @param slug The product slug
   * @returns Promise resolving to the product
   */
  getProductBySlug = async (slug: string): Promise<Product> => {
    return this.customGet<Product>(`by-slug/${slug}/`);
  };

  /**
   * Create a new product (admin only)
   * @param data The product data
   * @returns Promise resolving to the created product
   */
  createProduct = async (data: ProductCreate): Promise<ProductCreateResponse> => {
    return this.create(data);
  };
}

/**
 * Service for category-related API operations
 */
class CategoryService extends ApiService<Category, CategoryCreate> {
  constructor() {
    // Pass the endpoint to the parent class
    super('/products/categories');
  }

  /**
   * Get all categories
   * @returns Promise resolving to an array of categories
   */
  getAllCategories = async (): Promise<Category[]> => {
    return this.customGet<Category[]>('');
  };

  /**
   * Get products by category
   * @param categoryId The category ID or slug
   * @returns Promise resolving to an array of products in the category
   */
  getProductsByCategory = async (categoryId: number | string): Promise<ProductListItem[]> => {
    return this.customGet<ProductListItem[]>(`${categoryId}`);
  };

  /**
   * Create a new category (admin only)
   * @param data The category data
   * @returns Promise resolving to the created category
   */
  createCategory = async (data: CategoryCreate): Promise<CategoryResponse> => {
    return this.create(data) as unknown as CategoryResponse;
  };
}

// Create singleton instances
const productService = new ProductService();
const categoryService = new CategoryService();

export { categoryService };
export default productService;
