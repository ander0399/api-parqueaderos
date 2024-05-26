const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Endpoints de autenticación
router.post('/login', authController.login); //iniciar sesion 
router.post('/logout',authMiddleware.isAuthenticated, authController.logout); // cerrar sesion
router.post('/register', authMiddleware.isAdmin, authController.register); // registrar/crear socio

module.exports = router;