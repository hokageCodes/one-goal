import { auth, googleProvider } from '@/config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

/**
 * Sign in with Google using Firebase
 * @returns {Promise<Object>} User data from Firebase
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    return {
      email: user.email,
      name: user.displayName,
      uid: user.uid,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL
    };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

/**
 * Send user data to backend for authentication
 * @param {Object} userData - User data from Firebase
 * @returns {Promise<Object>} Backend response with JWT
 */
export const authenticateWithBackend = async (userData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/google-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Authentication failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error authenticating with backend:', error);
    throw error;
  }
};

/**
 * Complete Google OAuth flow
 * @returns {Promise<Object>} User data and JWT from backend
 */
export const googleAuthFlow = async () => {
  try {
    // Step 1: Sign in with Google via Firebase
    const userData = await signInWithGoogle();
    
    // Step 2: Send user data to backend for JWT creation
    const backendResponse = await authenticateWithBackend(userData);
    
    return backendResponse;
  } catch (error) {
    console.error('Google auth flow error:', error);
    throw error;
  }
};

/**
 * Sign out from Firebase
 */
export const firebaseSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Get current Firebase user
 */
export const getCurrentFirebaseUser = () => {
  return auth.currentUser;
};

/**
 * Listen to auth state changes
 * @param {Function} callback - Called when auth state changes
 * @returns {Function} Unsubscribe function
 */
export const onAuthStateChange = (callback) => {
  return auth.onAuthStateChanged(callback);
};
