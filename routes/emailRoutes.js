const express = require('express');
const router = express.Router();
const {isAuthenticated, isAdmin} = require('../middlewares/authMiddleware');
const emailController = require("../controllers/emailController");

router.post('/send', isAuthenticated, isAdmin, emailController.send);



module.exports = router;