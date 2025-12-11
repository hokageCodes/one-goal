// Firebase configuration for frontend
// Import this in your Next.js app

import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXI6Ft1mFVfnk9-uJa8k1BhAA1G0pnty0",
  authDomain: "one-goal-27c6b.firebaseapp.com",
  projectId: "one-goal-27c6b",
  storageBucket: "one-goal-27c6b.firebasestorage.app",
  messagingSenderId: "973567735036",
  appId: "1:973567735036:web:0fca2c6fef7b5ae48ed379",
  measurementId: "G-FB6RPDTZQ7"
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication
const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { app, auth, googleProvider };
