# Firebase OAuth Integration Guide

## Overview

Firebase is integrated ONLY for Google OAuth. Email/password authentication uses our custom backend system with email verification. Both authentication methods provide the same user experience and share the same JWT-based session management.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  ┌──────────────────┐          ┌──────────────────┐        │
│  │  Email/Password  │          │  Google OAuth    │        │
│  │   Registration   │          │   (Firebase)     │        │
│  └────────┬─────────┘          └────────┬─────────┘        │
│           │                              │                   │
│           │ POST /register               │ Firebase Auth    │
│           │ (email, password)            │ signInWithPopup  │
│           ▼                              ▼                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Backend API (Express)                    │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │         MongoDB               │
            │  - Unified User Model         │
            │  - authProvider: email/google │
            │  - firebaseUid (for OAuth)    │
            │  - password (for email)       │
            └───────────────────────────────┘
```

## User Model

```javascript
{
  email: String (unique),
  name: String,
  firstName: String,
  lastName: String,
  password: String (required only if authProvider = 'email'),
  authProvider: 'email' | 'google',
  firebaseUid: String (only for Google OAuth),
  isVerified: Boolean,
  role: 'user' | 'admin',
  // ... other fields
}
```

## Authentication Flows

### Flow 1: Email/Password Registration

1. User enters email, password, name
2. POST `/api/auth/register`
3. Backend creates user with `authProvider: 'email'`
4. Backend sends verification email
5. User clicks verification link
6. GET `/api/auth/verify-email/:token`
7. Backend sets `isVerified: true`
8. User can now login
9. POST `/api/auth/login` → Returns JWT

### Flow 2: Google OAuth (Firebase)

1. User clicks "Sign in with Google"
2. Frontend calls Firebase `signInWithPopup(googleProvider)`
3. Firebase returns ID token
4. Frontend sends ID token to backend
5. POST `/api/auth/firebase-login` with `{ idToken }`
6. Backend verifies token with Firebase Admin SDK
7. Backend checks if user exists:
   - **Exists:** Login user, return JWT
   - **New:** Create user with `authProvider: 'google'`, `isVerified: true`, return JWT
8. Frontend receives JWT and user data

### Flow 3: Account Linking (Email → Google)

If user registered with email/password, then tries to login with Google:

1. Backend finds existing user by email
2. Backend links Firebase UID to existing account
3. Updates `authProvider: 'google'`
4. User can now login with either method

## API Endpoints

### Email/Password Auth

```
POST   /api/auth/register          - Register with email/password
GET    /api/auth/verify-email/:token - Verify email
POST   /api/auth/login             - Login with email/password
POST   /api/auth/forgot-password   - Request password reset
PUT    /api/auth/reset-password/:token - Reset password
GET    /api/auth/me                - Get current user (protected)
POST   /api/auth/logout            - Logout (protected)
```

### Firebase OAuth

```
POST   /api/auth/firebase-login    - Login/Register with Google via Firebase
Body: { idToken: "firebase-id-token" }
```

## Frontend Integration

### 1. Install Firebase

```bash
npm install firebase
```

### 2. Use Firebase Auth Helper

```javascript
import { googleAuthFlow, firebaseSignOut } from '@/lib/firebaseAuth';

// Google Sign In
const handleGoogleSignIn = async () => {
  try {
    const { token, user, isNewUser } = await googleAuthFlow();
    
    // Store JWT token
    localStorage.setItem('token', token);
    
    // Redirect to dashboard
    router.push('/dashboard');
    
    if (isNewUser) {
      console.log('Welcome new user!');
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Sign Out
const handleSignOut = async () => {
  try {
    // Sign out from Firebase
    await firebaseSignOut();
    
    // Clear backend JWT
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    
    // Clear local storage
    localStorage.removeItem('token');
    
    // Redirect to login
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
```

### 3. Google Sign In Button Component

```jsx
'use client';

import { useState } from 'react';
import { googleAuthFlow } from '@/lib/firebaseAuth';
import { useRouter } from 'next/navigation';

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { token, user } = await googleAuthFlow();
      
      // Store token
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          {/* Google logo SVG */}
        </svg>
        {loading ? 'Signing in...' : 'Continue with Google'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
```

## Environment Variables

### Backend (.env)

```env
# Firebase
FIREBASE_PROJECT_ID=one-goal-27c6b

# For production, add Firebase service account:
# FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Security Features

✅ Firebase ID tokens verified on backend  
✅ JWT issued by our backend (not Firebase)  
✅ HTTP-only cookies for JWT storage  
✅ Google emails auto-verified (`isVerified: true`)  
✅ Account linking prevents duplicate accounts  
✅ Same RBAC system for all users  

## Production Setup

### 1. Get Firebase Service Account

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Download JSON file
4. Convert to single-line string:

```bash
cat service-account.json | jq -c . | pbcopy
```

5. Add to `.env`:

```env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}
```

### 2. Configure Firebase Auth

1. Firebase Console → Authentication → Sign-in method
2. Enable Google provider
3. Add authorized domains (your production domain)

### 3. Update CORS

Update `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://yourdomain.com'
  ],
  credentials: true
}));
```

## Testing

### Test Email/Password Flow

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login (after email verification)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

### Test Firebase OAuth

Use Postman collection or frontend UI. Backend expects:

```json
POST /api/auth/firebase-login
{
  "idToken": "firebase-id-token-from-frontend"
}
```

## Common Issues

**Issue: "Invalid Firebase token"**
- Solution: Ensure Firebase project ID matches in backend config
- For production, add service account JSON

**Issue: "User already exists"**
- Solution: Backend auto-links accounts by email
- If email/password user exists, Google login will link accounts

**Issue: CORS errors**
- Solution: Check `CLIENT_URL` in backend `.env`
- Ensure `credentials: 'include'` in fetch calls

## Files Created

```
Backend:
- config/firebase.js               # Firebase Admin SDK setup
- controllers/firebaseAuthController.js  # Firebase login logic
- routes/firebaseAuthRoutes.js     # Firebase routes
- models/User.js (updated)         # Added authProvider, firebaseUid

Frontend:
- config/firebase.js               # Firebase client config
- lib/firebaseAuth.js              # Google auth helper functions
```

## Next Steps

1. ✅ Firebase OAuth setup complete
2. ⏳ Create login/register UI pages
3. ⏳ Build AuthContext for state management
4. ⏳ Test full authentication flow
5. ⏳ Add protected routes middleware

---

**Both authentication methods now provide identical user experience with unified JWT-based sessions.**
