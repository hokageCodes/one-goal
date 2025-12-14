// API configuration that auto-detects environment
const getApiUrl = () => {
  // Check if we're on Vercel production domain
  if (typeof window !== 'undefined') {
    // Client-side: check current hostname
    if (window.location.hostname === 'one-goal-ten.vercel.app') {
      console.log('🔵 Using PRODUCTION API (from hostname detection)');
      return 'https://one-goal-hlbf.vercel.app';
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('🟢 Using DEV API (localhost detected)');
      return 'http://localhost:5000';
    }
  }

  // Server-side or fallback: use environment variables
  if (process.env.NODE_ENV === 'production') {
    const url = process.env.NEXT_PUBLIC_API_URL_PROD || 'https://one-goal-hlbf.vercel.app';
    console.log('🔵 Using PRODUCTION API:', url);
    return url;
  }
  
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  console.log('🟢 Using DEV API:', url);
  return url;
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
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export default apiRequest;
