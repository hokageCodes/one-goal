// API configuration that auto-detects environment
const getApiUrl = () => {
  // Check if we're on Vercel production domain (client-side only)
  if (typeof window !== 'undefined' && window.location.hostname === 'one-goal-ten.vercel.app') {
    return 'https://one-goal-hlbf.vercel.app';
  }
  
  // Check for localhost (client-side)
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000';
  }

  // Server-side or fallback: use environment variables only
  if (process.env.NEXT_PUBLIC_API_URL_PROD) {
    return process.env.NEXT_PUBLIC_API_URL_PROD;
  }
  
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
};

export const API_URL = getApiUrl();

// Helper function for API requests
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Include cookies for JWT
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Something went wrong');
      error.status = response.status;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export default apiRequest;
