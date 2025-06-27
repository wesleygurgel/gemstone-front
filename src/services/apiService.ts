import api from '../utils/api';

/**
 * Generic API service for CRUD operations
 * @template T The type of the resource
 * @template C The type of the create payload (defaults to Partial<T>)
 * @template U The type of the update payload (defaults to Partial<T>)
 */
export class ApiService<T, C = Partial<T>, U = Partial<T>> {
  /**
   * Base endpoint for the resource
   */
  protected endpoint: string;

  /**
   * Create a new API service
   * @param endpoint The base endpoint for the resource
   */
  constructor(endpoint: string) {
    // Ensure endpoint starts with a slash and doesn't end with a slash
    this.endpoint = endpoint.startsWith('/') 
      ? endpoint 
      : `/${endpoint}`;

    this.endpoint = this.endpoint.endsWith('/') 
      ? this.endpoint.slice(0, -1) 
      : this.endpoint;
  }

  /**
   * Get all resources
   * @param params Query parameters
   * @returns Promise resolving to an array of resources
   */
  getAll = async (params?: Record<string, any>): Promise<T[]> => {
    const response = await api.get<T[]>(this.endpoint, { params });
    return response.data;
  };

  /**
   * Get a resource by ID
   * @param id The resource ID
   * @returns Promise resolving to the resource
   */
  getById = async (id: number | string): Promise<T> => {
    const response = await api.get<T>(`${this.endpoint}/${id}/`);
    return response.data;
  };

  /**
   * Create a new resource
   * @param data The resource data
   * @returns Promise resolving to the created resource
   */
  create = async (data: C): Promise<T> => {
    const response = await api.post<T>(this.endpoint + '/', data);
    return response.data;
  };

  /**
   * Update a resource
   * @param id The resource ID
   * @param data The update data
   * @returns Promise resolving to the updated resource
   */
  update = async (id: number | string, data: U): Promise<T> => {
    const response = await api.put<T>(`${this.endpoint}/${id}/`, data);
    return response.data;
  };

  /**
   * Partially update a resource
   * @param id The resource ID
   * @param data The partial update data
   * @returns Promise resolving to the updated resource
   */
  patch = async (id: number | string, data: Partial<U>): Promise<T> => {
    const response = await api.patch<T>(`${this.endpoint}/${id}/`, data);
    return response.data;
  };

  /**
   * Delete a resource
   * @param id The resource ID
   * @returns Promise resolving to void
   */
  delete = async (id: number | string): Promise<void> => {
    await api.delete(`${this.endpoint}/${id}/`);
  };

  /**
   * Custom GET request to a sub-endpoint
   * @param path The sub-endpoint path
   * @param params Query parameters
   * @returns Promise resolving to the response data
   */
  customGet = async <R = any>(path: string, params?: Record<string, any>): Promise<R> => {
    const fullPath = path.startsWith('/') 
      ? `${this.endpoint}${path}` 
      : `${this.endpoint}/${path}`;

    const response = await api.get<R>(fullPath, { params });
    return response.data;
  };

  /**
   * Custom POST request to a sub-endpoint
   * @param path The sub-endpoint path
   * @param data The request data
   * @returns Promise resolving to the response data
   */
  customPost = async <D = any, R = any>(path: string, data?: D): Promise<R> => {
    const fullPath = path.startsWith('/') 
      ? `${this.endpoint}${path}` 
      : `${this.endpoint}/${path}`;

    const response = await api.post<R>(fullPath, data);
    return response.data;
  };
}
