const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getSystemStats,
  getAllUsers,
  getAllGoals,
  updateUserRole,
  deleteUser,
} = require('../controllers/adminController');

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// GET /api/admin/stats - System statistics
router.get('/stats', getSystemStats);

// GET /api/admin/users - Get all users
router.get('/users', getAllUsers);

// PUT /api/admin/users/:id/role - Update user role
router.put('/users/:id/role', updateUserRole);

// DELETE /api/admin/users/:id - Delete user
router.delete('/users/:id', deleteUser);

// GET /api/admin/goals - Get all goals
router.get('/goals', getAllGoals);

module.exports = router;
