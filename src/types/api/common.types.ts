/**
 * Common API type definitions
 */

/**
 * Standard API error response
 */
export interface ApiError {
  detail?: string;
  [key: string]: any;
}

/**
 * Validation error response
 */
export interface ValidationError {
  [field: string]: string[];
}


/**
 * Handled API error with type information
 */
export interface HandledApiError {
  type: 'VALIDATION_ERROR' | 'AUTH_ERROR' | 'PERMISSION_ERROR' | 'NOT_FOUND' | 'SERVER_ERROR' | 'NETWORK_ERROR' | 'REQUEST_ERROR' | 'UNKNOWN_ERROR';
  message: string;
  errors?: ValidationError;
  originalError?: any;
}
