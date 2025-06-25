import { ApiError, HandledApiError, ValidationError } from '../types/api';
import axios, { AxiosError } from 'axios';

/**
 * Handles API errors and returns a standardized error object
 * @param error The error to handle
 * @returns A standardized error object
 */
export const handleApiError = (error: unknown): HandledApiError => {
  // Handle Axios errors
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    
    if (axiosError.response) {
      // Server responded with error status
      const { status, data } = axiosError.response;
      
      switch (status) {
        case 400:
          // Handle validation errors
          return { 
            type: 'VALIDATION_ERROR', 
            message: 'Validation failed',
            errors: data as unknown as ValidationError,
            originalError: error
          };
        case 401:
          // Handle authentication errors
          return { 
            type: 'AUTH_ERROR', 
            message: 'Authentication required',
            originalError: error
          };
        case 403:
          // Handle permission errors
          return { 
            type: 'PERMISSION_ERROR', 
            message: 'Permission denied',
            originalError: error
          };
        case 404:
          // Handle not found errors
          return { 
            type: 'NOT_FOUND', 
            message: 'Resource not found',
            originalError: error
          };
        case 500:
        case 502:
        case 503:
        case 504:
          // Handle server errors
          return { 
            type: 'SERVER_ERROR', 
            message: 'Server error occurred',
            originalError: error
          };
        default:
          return { 
            type: 'UNKNOWN_ERROR', 
            message: data?.detail || 'An unknown error occurred',
            originalError: error
          };
      }
    } else if (axiosError.request) {
      // Request made but no response received
      return { 
        type: 'NETWORK_ERROR', 
        message: 'Network error, please check your connection',
        originalError: error
      };
    }
  }
  
  // Handle other errors
  return { 
    type: 'REQUEST_ERROR', 
    message: error instanceof Error ? error.message : 'An unknown error occurred',
    originalError: error
  };
};

/**
 * Extracts a user-friendly error message from a handled API error
 * @param error The handled API error
 * @returns A user-friendly error message
 */
export const getErrorMessage = (error: HandledApiError): string => {
  switch (error.type) {
    case 'VALIDATION_ERROR':
      // For validation errors, return the first error message
      if (error.errors) {
        const firstField = Object.keys(error.errors)[0];
        if (firstField && error.errors[firstField].length > 0) {
          return error.errors[firstField][0];
        }
      }
      return 'Please check your input and try again';
    
    case 'AUTH_ERROR':
      return 'Please log in to continue';
    
    case 'PERMISSION_ERROR':
      return 'You do not have permission to perform this action';
    
    case 'NOT_FOUND':
      return 'The requested resource was not found';
    
    case 'SERVER_ERROR':
      return 'A server error occurred. Please try again later';
    
    case 'NETWORK_ERROR':
      return 'Unable to connect to the server. Please check your internet connection';
    
    default:
      return error.message || 'An unexpected error occurred';
  }
};