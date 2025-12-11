const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// For production, use service account JSON file
// For development, can use default credentials or service account
let firebaseApp;

try {
  // Check if already initialized
  firebaseApp = admin.app();
} catch (error) {
  // Initialize if not already done
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Production: Use service account JSON
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID
    });
  } else {
    // Development: Use application default credentials or minimal config
    firebaseApp = admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'one-goal-27c6b'
    });
  }
}

// Verify Firebase ID token
const verifyFirebaseToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    throw new Error('Invalid Firebase token');
  }
};

module.exports = {
  admin,
  firebaseApp,
  verifyFirebaseToken
};
