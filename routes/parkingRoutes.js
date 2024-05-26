const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');
const vehicleController = require('../controllers/vehicleController');
const { isAuthenticated, isAdmin, isSocio } = require('../middlewares/authMiddleware');

// Endpoints CRUD de parqueaderos

//todos los parqueaderos (si es socio traera los parqueaderos asignados a él, si es admin todos en general)
router.get('/:userId', isAuthenticated, parkingController.getAllParkings); 
//todos los vehiculos (si es socio traera los vehiculos de un parqueadero asignado, si es admin todos los vehiculos de un parqueadero especifico)
router.get('/:userId/:parkingId', isAuthenticated, parkingController.getAllVehicles);
// (admin) crear parqueadero
router.post('/', isAuthenticated, isAdmin, parkingController.createParking); 
// (admin) actualizar parqueadero
router.put('/:id', isAuthenticated, isAdmin, parkingController.updateParking); 
// (admin) borrar parqueadero
router.delete('/:id', isAuthenticated, isAdmin, parkingController.deleteParking); 
// (admin) asignar parqueadero a socio
router.post('/assign', isAuthenticated, isAdmin, parkingController.assignParkingToSocio);  


module.exports = router;