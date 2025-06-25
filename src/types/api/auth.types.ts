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
 * Registration request payload
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirm?: string;
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
 * User profile information
 */
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  date_joined: string;
  last_login?: string;
}