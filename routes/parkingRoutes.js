const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');
const vehicleController = require('../controllers/vehicleController');
const {isAuthenticated, isAdmin, isSocio} = require('../middlewares/authMiddleware');

// Endpoints CRUD de parqueaderos
router.post('/', isAuthenticated, isAdmin, parkingController.createParking);
router.get('/', isAuthenticated,isAdmin, parkingController.getAllParkings);
router.get('/:id', isAuthenticated,isAdmin, parkingController.getParkingById);
router.put('/:id', isAuthenticated, isAdmin, parkingController.updateParking);
router.delete('/:id', isAuthenticated, isAdmin, parkingController.deleteParking);
router.post('/assign', isAuthenticated, isAdmin, parkingController.assignParkingToSocio);
router.get('/user/:userId', isAuthenticated,isSocio, parkingController.getParkingsByUserId);
router.get('/parking/:parkingId', isAuthenticated, vehicleController.getVehiclesByParkingId);
router.get('/parking/:parkingId/:vehicleId', isAuthenticated, vehicleController.getVehicleDetailByParkingId);

module.exports = router;