const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const {isAuthenticated, isAdmin, isSocio} = require('../middlewares/authMiddleware');

// Endpoints de registro de entrada y salida de vehículos
router.get('/', isAuthenticated,authMiddleware.isAdmin, vehicleController.getAllVehicles);
router.get('/:id', isAuthenticated, vehicleController.getVehicleById);
router.get('/parking/:parkingId', isAuthenticated, vehicleController.getVehiclesByParkingId);
router.post('/entry', isAuthenticated,authMiddleware.isSocio, vehicleController.registerVehicleEntry);
router.post('/exit', isAuthenticated, isSocio, vehicleController.registerVehicleExit);


module.exports = router;