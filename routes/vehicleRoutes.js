const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const {isAuthenticated, isAdmin, isSocio} = require('../middlewares/authMiddleware');

// Endpoints de registro de entrada y salida de vehículos



// (socio) registrar entrada de vehiculo
router.post('/entry', isAuthenticated,isSocio, vehicleController.registerVehicleEntry); 
// (socio) registrar salida de vehiculo
router.post('/exit', isAuthenticated, isSocio, vehicleController.registerVehicleExit); 


module.exports = router;