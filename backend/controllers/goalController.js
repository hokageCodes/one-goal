const Goal = require('../models/Goal');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Create new goal
// @route   POST /api/goals
// @access  Private
exports.createGoal = asyncHandler(async (req, res) => {
  const { title, description, deadline } = req.body;

  // Create goal
  const goal = await Goal.create({
    user: req.user._id,
    title,
    description,
    deadline,
  });

  res.status(201).json({
    success: true,
    goal,
  });
});

// @desc    Get all goals for logged-in user
// @route   GET /api/goals
// @access  Private
exports.getGoals = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const filter = { user: req.user._id };
  if (status) {
    filter.status = status;
  }

  const goals = await Goal.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: goals.length,
    goals,
  });
});

// @desc    Get active goal for logged-in user
// @route   GET /api/goals/active
// @access  Private
exports.getActiveGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findOne({
    user: req.user._id,
    status: 'active',
  });

  res.status(200).json({
    success: true,
    goal,
  });
});

// @desc    Get single goal
// @route   GET /api/goals/:id
// @access  Private
exports.getGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  // Make sure goal belongs to user
  if (goal.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to access this goal' });
  }

  res.status(200).json({
    success: true,
    goal,
  });
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
exports.updateGoal = asyncHandler(async (req, res) => {
  let goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  // Make sure goal belongs to user
  if (goal.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to update this goal' });
  }

  const { title, description, deadline, progress, status } = req.body;

  goal = await Goal.findByIdAndUpdate(
    req.params.id,
    { title, description, deadline, progress, status },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    goal,
  });
});

// @desc    Complete goal
// @route   PUT /api/goals/:id/complete
// @access  Private
exports.completeGoal = asyncHandler(async (req, res) => {
  let goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  // Make sure goal belongs to user
  if (goal.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to complete this goal' });
  }

  goal.status = 'completed';
  goal.progress = 100;
  goal.completedAt = new Date();
  await goal.save();

  res.status(200).json({
    success: true,
    message: 'Goal completed! 🎉',
    goal,
  });
});

// @desc    Archive goal
// @route   PUT /api/goals/:id/archive
// @access  Private
exports.archiveGoal = asyncHandler(async (req, res) => {
  let goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  // Make sure goal belongs to user
  if (goal.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to archive this goal' });
  }

  goal.status = 'archived';
  goal.archivedAt = new Date();
  await goal.save();

  res.status(200).json({
    success: true,
    message: 'Goal archived',
    goal,
  });
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
exports.deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  // Make sure goal belongs to user
  if (goal.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to delete this goal' });
  }

  await goal.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Goal deleted',
  });
});
