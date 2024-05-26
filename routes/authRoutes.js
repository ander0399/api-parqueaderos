const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');

// Endpoints de autenticación

// iniciar sesion
router.post('/login', authController.login); 
// // cerrar sesion 
router.post('/logout', isAuthenticated, authController.logout); 
// (admin) registrar/crear socio
router.post('/register', isAuthenticated, isAdmin, authController.register); 

module.exports = router;