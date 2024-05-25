const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Endpoints de autenticación
router.post('/login', authController.login);
router.post('/register', authMiddleware.isAdmin, authController.register);

module.exports = router;