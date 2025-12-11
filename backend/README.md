# One Goal - Backend API

Node.js + Express + MongoDB backend for the One Goal productivity app.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory:

```bash
# Server
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Database
MONGO_URI=mongodb://localhost:27017/onegoal

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@onegoal.com
EMAIL_FROM_NAME=One Goal

# OAuth (for Phase 2 - Google)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or use MongoDB Atlas (cloud) and update MONGO_URI
```

### 4. Run Server

```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Health Check

```
GET /api/health
```

Returns server status.

### Authentication

#### Register User

```
POST /api/auth/register
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful. Check your email to verify your account."
}
```

**Validation:**
- Email must be valid
- Password min 8 characters, must contain uppercase, lowercase, and number
- First and last name min 2 characters

---

#### Firebase Login (Google OAuth)

```
POST /api/auth/firebase-login
```

**Body:**
```json
{
  "idToken": "firebase-id-token-from-frontend"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@gmail.com",
    "name": "John Doe",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "authProvider": "google",
    "isVerified": true
  },
  "isNewUser": false
}
```

**Notes:** 
- Google-authenticated users are auto-verified
- Creates new account or logs in existing user
- Auto-links accounts if email matches
- Returns same JWT format as email/password auth

---

#### Verify Email

```
GET /api/auth/verify-email/:token
```

Verifies email using the token sent to user's email.

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully. You can now log in."
}
```

---

#### Login

```
POST /api/auth/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
```

**Note:** User must verify email before logging in.

---

#### Get Current User

```
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "isVerified": true
  }
}
```

---

#### Logout

```
POST /api/auth/logout
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### Forgot Password

```
POST /api/auth/forgot-password
```

**Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "If an account exists with that email, you will receive a password reset link."
}
```

Sends password reset email with token (valid for 1 hour).

---

#### Reset Password

```
PUT /api/auth/reset-password/:token
```

**Body:**
```json
{
  "password": "NewSecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful",
  "token": "new-jwt-token",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
```

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── authController.js     # Auth logic
├── middleware/
│   ├── auth.js               # JWT verification & protection
│   ├── role.js               # RBAC authorization
│   └── errorHandler.js       # Global error handling
├── models/
│   └── User.js               # User schema
├── routes/
│   └── authRoutes.js         # Auth endpoints
├── templates/
│   ├── verificationEmail.js  # Email verification template
│   └── resetPasswordEmail.js # Password reset template
├── utils/
│   └── sendEmail.js          # Nodemailer utility
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies
├── server.js                 # Express app entry point
└── README.md                 # This file
```

## User Model

```javascript
{
  email: String (unique, required),
  password: String (hashed, required for email auth),
  firstName: String (required),
  lastName: String (required),
  name: String (required),
  authProvider: String (enum: ['email', 'google'], default: 'email'),
  firebaseUid: String (unique, for Google OAuth),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isVerified: Boolean (default: false, auto-true for Google),
  verificationToken: String,
  verificationTokenExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Middleware

### Authentication (`protect`)

Verifies JWT token from:
1. `Authorization: Bearer <token>` header
2. `token` cookie

Attaches `req.user` with user data.

### Email Verification (`requireVerified`)

Ensures user has verified their email before accessing protected routes.

### Authorization (`authorize(...roles)`)

Restricts routes to specific user roles:

```javascript
router.get('/admin', protect, authorize('admin'), adminController);
```

## Error Handling

All errors are caught by the global error handler:

```json
{
  "success": false,
  "message": "Error message here",
  "stack": "Stack trace (development only)"
}
```

## Email Templates

Two HTML email templates with brand styling:

1. **Verification Email** - Sent on registration
2. **Password Reset Email** - Sent on forgot password

Both include:
- One Goal branding
- Clear CTAs
- 24-hour expiry (verification) / 1-hour expiry (reset)
- Fallback copy-paste links

## Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT with 7-day expiry
- ✅ HTTP-only cookies
- ✅ CORS with credentials
- ✅ Email verification required
- ✅ Secure password reset flow
- ✅ Input validation (express-validator)
- ✅ Role-based access control

## Next Steps (Phase 2 Continued)

- [ ] Google OAuth integration
- [ ] User profile management
- [ ] Goal CRUD operations
- [ ] Task management
- [ ] Analytics endpoints
- [ ] Admin dashboard routes

## Testing

Use tools like Postman or cURL to test endpoints:

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

# Health check
curl http://localhost:5000/api/health
```

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `brew services list`
- Check MONGO_URI in `.env`
- For MongoDB Atlas, whitelist your IP

**Email Not Sending:**
- Verify email credentials in `.env`
- For Gmail, use App-Specific Password (not regular password)
- Check spam folder

**Port Already in Use:**
- Change PORT in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill`

## License

Private - One Goal Team
