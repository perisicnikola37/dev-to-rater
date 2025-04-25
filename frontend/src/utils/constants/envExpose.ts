/**
 * The current environment of the application.
 *
 * @constant {string} ENVIRONMENT - The environment in which the application is running (e.g., 'development', 'production').
 */
export const ENVIRONMENT = import.meta.env.VITE_APP_ENVIRONMENT

/**
 * The Google Analytics 4 ID used for tracking.
 *
 * @constant {string} GA_4_ID - The Google Analytics 4 tracking ID.
 */
export const GA_4_ID = import.meta.env.VITE_APP_GA_ID

/**
 * The URL of the API server.
 *
 * @constant {string} API_URL - The URL of the API server.
 */
export const API_URL = import.meta.env.VITE_API_URL

/**
 * Port of the frontend application.
 *
 * @constant {string} FRONTEND_APPLICATION_PORT - Port of the frontend application.
 */
export const FRONTEND_APPLICATION_PORT = import.meta.env
  .VITE_FRONTEND_APPLICATION_PORT
