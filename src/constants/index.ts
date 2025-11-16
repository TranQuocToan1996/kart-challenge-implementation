// API Configuration from environment variables
// In Vite, environment variables must be prefixed with VITE_ to be exposed to the client
// In development, always use '/api' to leverage Vite proxy and avoid CORS issues
export const API_BASE_URL = import.meta.env.DEV
  ? '/api' // Use proxy in development to avoid CORS
  : (import.meta.env.VITE_API_BASE_URL || 'https://orderfoodonline.deno.dev/api');

export const API_KEY = import.meta.env.VITE_API_KEY || '';

// Warn if API key is not set (only in development)
if (import.meta.env.DEV && !API_KEY) {
  console.warn(
    '⚠️ VITE_API_KEY is not set in environment variables. ' +
    'Please create a .env file with VITE_API_KEY=your_api_key'
  );
}

export const DISCOUNT_CODES = {
  HAPPYHOURS: 'HAPPYHOURS',
  BUYGETONE: 'BUYGETONE',
} as const;

export const DISCOUNT_TYPES = {
  PERCENTAGE: 'PERCENTAGE',
  FREE_ITEM: 'FREE_ITEM',
} as const;

export const HAPPYHOURS_DISCOUNT = 0.18; // 18%

