import axios from 'axios';
import { handleApiError } from './errorHandler';
import { API_URL } from './env';

// Base URL for API requests - configured from environment variables

// Token storage keys
export const TOKEN_STORAGE = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get the stored access token
 * @returns The access token or null if not found
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_STORAGE.ACCESS_TOKEN);
};

/**
 * Get the stored refresh token
 * @returns The refresh token or null if not found
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(TOKEN_STORAGE.REFRESH_TOKEN);
};

/**
 * Store authentication tokens
 * @param accessToken The access token to store
 * @param refreshToken The refresh token to store
 */
export const storeTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem(TOKEN_STORAGE.ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_STORAGE.REFRESH_TOKEN, refreshToken);
};

/**
 * Clear stored authentication tokens
 */
export const clearTokens = (): void => {
  localStorage.removeItem(TOKEN_STORAGE.ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_STORAGE.REFRESH_TOKEN);
};

/**
 * Refresh the access token using the refresh token
 * @returns A promise that resolves to the new access token
 */
export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: refreshToken
    });

    const { access } = response.data;
    localStorage.setItem(TOKEN_STORAGE.ACCESS_TOKEN, access);

    return access;
  } catch (error) {
    // If refresh fails, clear tokens and throw error
    clearTokens();
    throw error;
  }
};

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Get access token from localStorage
    const token = getAccessToken();

    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for token refresh and error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;

    // Skip token refresh for login endpoint
    const isLoginRequest = originalRequest.url?.includes('/token/') && !originalRequest.url?.includes('/token/refresh/');

    // If error is 401 and we haven't tried to refresh token yet and it's not a login request
    if (error.response?.status === 401 && !originalRequest._retry && !isLoginRequest) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const newToken = await refreshAccessToken();

        // Update auth header and retry
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, redirect to login
        clearTokens();

        // Only redirect to login if not already on login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    // For other errors, use our error handler
    const handledError = handleApiError(error);

    return Promise.reject(handledError);
  }
);

export default api;
