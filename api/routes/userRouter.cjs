const userController = require('../controllers/userController.cjs');
const { authenticateToken } = require('../utils/authUtils.cjs'); // Import authenticateToken
const router = require('express').Router();

router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);
router.get('/token', authenticateToken, userController.getUserByToken);    // New route for fetching user by token
// router.get('/username/:username', authenticateToken, userController.getUserByUsername);  // New route for fetching user by username
router.get('/search/:searchTerm', authenticateToken, userController.searchUsersByUsername); // Route for searching users by username substring

module.exports = router;