// All Google OAuth and Firebase auth logic removed
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
