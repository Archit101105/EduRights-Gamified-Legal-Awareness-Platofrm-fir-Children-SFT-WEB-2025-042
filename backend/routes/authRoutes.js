const express = require('express');
const router  = express.Router();
const {loginUser,registerUser,forgotPassword,resetPassword,getMe} = require('../controllers/authController');
const {protect} = require('../middleware/authMiddleware')

router.post('/auth/login',loginUser);
router.post('/auth/register',registerUser);
router.post('/auth/forgot-password', forgotPassword);
router.put('/auth/reset-password/:resetToken', resetPassword);
router.get('/auth/me', protect, getMe);

module.exports = router;
