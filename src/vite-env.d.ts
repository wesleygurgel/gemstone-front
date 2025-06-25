/// <reference types="vite/client" />

/**
 * Type definitions for Vite environment variables
 */
interface ImportMetaEnv {
  /**
   * The URL of the backend API
   */
  readonly VITE_API_URL: string;
  
  /**
   * Enable/disable authentication features
   */
  readonly VITE_ENABLE_AUTH: string;
  
  /**
   * Enable/disable analytics
   */
  readonly VITE_ENABLE_ANALYTICS: string;
  
  /**
   * Application name
   */
  readonly VITE_APP_NAME: string;
  
  /**
   * Application version
   */
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}