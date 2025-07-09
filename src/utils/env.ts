/**
 * Environment variables utility
 * 
 * This file provides a centralized place to access environment variables
 * with proper typing and default values.
 */

/**
 * API URL for backend requests
 */
export const API_URL = import.meta.env.VITE_API_URL || 'https://gemstone-back-production.up.railway.app/api/v1';

/**
 * Check if authentication features are enabled
 */
export const IS_AUTH_ENABLED = import.meta.env.VITE_ENABLE_AUTH !== 'false';

/**
 * Check if analytics are enabled
 */
export const IS_ANALYTICS_ENABLED = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';

/**
 * Application name
 */
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'GEMSTONE U.S.A. Diamond\'s & Gold LLC';

/**
 * Company full name
 */
export const COMPANY_FULL_NAME = 'GEMSTONE U.S.A. Diamond\'s & Gold LLC';

/**
 * Application version
 */
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '0.1.0';

/**
 * Check if we're in development mode
 */
export const IS_DEV = import.meta.env.DEV;

/**
 * Check if we're in production mode
 */
export const IS_PROD = import.meta.env.PROD;

/**
 * Get all environment variables
 */
export const getEnv = () => ({
  API_URL,
  IS_AUTH_ENABLED,
  IS_ANALYTICS_ENABLED,
  APP_NAME,
  COMPANY_FULL_NAME,
  APP_VERSION,
  IS_DEV,
  IS_PROD,
});

export default getEnv;
