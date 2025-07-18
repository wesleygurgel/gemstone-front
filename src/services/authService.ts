import api, { storeTokens, clearTokens } from '../utils/api';
import { 
  LoginRequest, 
  RegisterRequest, 
  RegisterResponse, 
  TokenResponse, 
  UserProfile
} from '../types/api';

/**
 * Authentication service for handling user authentication operations
 */
const authService = {
  /**
   * Register a new user
   * @param userData User registration data
   * @returns Promise resolving to the registration response
   */
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/accounts/register/', userData);
    return response.data;
  },

  /**
   * Login a user with email and password
   * @param credentials User login credentials
   * @returns Promise resolving to the user profile
   */
  login: async (credentials: LoginRequest): Promise<UserProfile> => {
    try {
      // First, get the JWT tokens
      const tokenResponse = await api.post<TokenResponse>('/token/', credentials);
      const { access, refresh } = tokenResponse.data;

      // Store tokens
      storeTokens(access, refresh);

      // Then, get the user profile
      const profileResponse = await api.get<UserProfile>('/accounts/me/');
      return profileResponse.data;
    } catch (error) {
      throw error; // Re-throw to be handled by the caller
    }
  },

  /**
   * Logout the current user
   */
  logout: (): void => {
    clearTokens();
    // Note: JWT logout is client-side only (discard tokens)
  },

  /**
   * Check if the user is authenticated
   * @returns True if the user has a valid token
   */
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('access_token');
    return !!token;
  },

  /**
   * Get the current user's profile
   * @returns Promise resolving to the user profile
   */
  getCurrentUser: async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>('/accounts/me/');
    return response.data;
  },

  /**
   * Update the current user's profile
   * @param profileData Updated profile data
   * @returns Promise resolving to the updated profile data
   */
  updateProfile: async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
    // If the data is for the profile, nest it under the profile property
    const userData: Partial<UserProfile> = profileData.profile 
      ? profileData 
      : { profile: profileData as any };

    const response = await api.patch<UserProfile>('/accounts/me/', userData);
    return response.data;
  },

  /**
   * Update the current user's account information
   * @param userData Updated user data
   * @returns Promise resolving to the updated user profile
   */
  updateAccount: async (userData: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await api.patch<UserProfile>('/accounts/me/', userData);
    return response.data;
  },

  /**
   * Change the user's password
   * @param oldPassword Current password
   * @param newPassword New password
   * @returns Promise resolving to success message
   */
  changePassword: async (oldPassword: string, newPassword: string): Promise<{ detail: string }> => {
    const response = await api.post<{ detail: string }>('/accounts/me/change-password/', {
      old_password: oldPassword,
      new_password: newPassword,
    });
    return response.data;
  }
};

export default authService;
