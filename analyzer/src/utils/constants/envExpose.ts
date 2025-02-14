/**
 * The current environment of the application.
 * This value is typically set in the environment configuration file.
 *
 * @constant {string} ENVIRONMENT - The environment in which the application is running (e.g., 'development', 'production').
 */

/**
 * The Google Analytics 4 ID used for tracking.
 * This value is typically set in the environment configuration file.
 *
 * @constant {string} GA_4_ID - The Google Analytics 4 tracking ID.
 */
//

/**
 * The URL of the API server.
 * This value is typically set in the environment configuration file.
 *
 * @constant {string} API_URL - The URL of the API server.
 */

export const ENVIRONMENT = import.meta.env.VITE_APP_ENVIRONMENT
export const GA_4_ID = import.meta.env.VITE_APP_GA_ID
export const API_URL = import.meta.env.VITE_API_URL
