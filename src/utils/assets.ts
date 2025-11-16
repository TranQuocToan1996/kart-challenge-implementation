/**
 * Get the correct path for public assets, handling base URL for GitHub Pages
 * @param path - The asset path (e.g., '/icon.png')
 * @returns The path with the correct base URL prefix
 */
export const getAssetPath = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Vite's BASE_URL already includes trailing slash, so we add the path
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

