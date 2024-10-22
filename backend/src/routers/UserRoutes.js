const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/getuser', authMiddleware, userController.getUser);
router.post('/logout', userController.logoutUser);

module.exports = router;
