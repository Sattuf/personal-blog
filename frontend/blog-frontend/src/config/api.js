// API Configuration
// In development, use the proxy (empty string) to let Vite proxy handle it
// In production, use the full URL
const isDevelopment = import.meta.env.MODE === 'development';
const API_BASE_URL = import.meta.env.VITE_API_URL || (isDevelopment ? '' : 'http://localhost:5000');

export const API_ENDPOINTS = {
  BASE: API_BASE_URL,
  HEALTH: `${API_BASE_URL}/api/health`,
  ARTICLES: `${API_BASE_URL}/api/articles`,
  ARTICLE_BY_ID: (id) => `${API_BASE_URL}/api/articles/${id}`,
  ARTICLES_BY_CATEGORY: (category) => `${API_BASE_URL}/api/articles/category/${category}`,
};

// Helper function to fetch with error handling
export const fetchAPI = async (url, options = {}) => {
  try {
    console.log(`Fetching from: ${url}`);
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Data received from ${url}:`, data);
    return data;
  } catch (error) {
    console.error('API Error:', error);
    console.error('URL that failed:', url);
    throw error;
  }
};

// Helper function to check backend health
export const checkBackendHealth = async () => {
  try {
    const response = await fetchAPI(API_ENDPOINTS.HEALTH);
    console.log('✅ Backend is healthy:', response);
    return response;
  } catch (error) {
    console.error('❌ Backend health check failed:', error);
    throw error;
  }
};

export default API_BASE_URL;

