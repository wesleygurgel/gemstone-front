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
import { PaginatedResponse } from '../types/api';

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
   * @returns Promise resolving to a paginated response of products
   */
  getProducts = async (params?: {
    category?: number | string;
    available?: boolean;
    featured?: boolean;
    search?: string;
  }): Promise<PaginatedResponse<ProductListItem>> => {
    return this.getAll(params);
  };

  /**
   * Get featured products
   * @returns Promise resolving to an array of featured products
   */
  getFeaturedProducts = async (): Promise<ProductListItem[]> => {
    return this.customGet<ProductListItem[]>('featured/');
  };

  /**
   * Get products by category
   * @param categoryId The category ID or slug
   * @returns Promise resolving to an array of products in the category
   */
  getProductsByCategory = async (categoryId: number | string): Promise<PaginatedResponse<ProductListItem>> => {
    return this.getAll({ category: categoryId });
  };

  /**
   * Search products
   * @param query The search query
   * @returns Promise resolving to a paginated response of matching products
   */
  searchProducts = async (query: string): Promise<PaginatedResponse<ProductListItem>> => {
    return this.getAll({ search: query });
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
    return this.customGet<Category[]>('all/');
  };

  /**
   * Create a new category (admin only)
   * @param data The category data
   * @returns Promise resolving to the created category
   */
  createCategory = async (data: CategoryCreate): Promise<CategoryResponse> => {
    return this.create(data);
  };
}

// Create singleton instances
const productService = new ProductService();
const categoryService = new CategoryService();

export { categoryService };
export default productService;
