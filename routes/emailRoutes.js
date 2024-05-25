const express = require('express');
const router = express.Router();
const {isAuthenticated, isAdmin} = require('../middlewares/authMiddleware');

router.post('/send', isAuthenticated, isAdmin, emailController.sendEmailToSocios);



module.exports = router;