/**
 * Authentication related type definitions
 */

/**
 * Login request payload
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * User profile information
 */
export interface UserProfileData {
  phone_number: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

/**
 * Registration request payload
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  profile: UserProfileData;
}

/**
 * Registration response
 */
export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile: UserProfileData;
}

/**
 * Profile update request
 */
export interface ProfileUpdateRequest {
  phone_number: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

/**
 * JWT token response from authentication endpoints
 */
export interface TokenResponse {
  access: string;
  refresh: string;
}

/**
 * Refresh token request payload
 */
export interface RefreshTokenRequest {
  refresh: string;
}

/**
 * Complete user profile information
 */
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile: UserProfileData;
  is_active: boolean;
  date_joined: string;
  last_login?: string;
}
