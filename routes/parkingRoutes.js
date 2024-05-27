const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');
const { isAuthenticated, isAdmin, isSocio } = require('../middlewares/authMiddleware');

// Endpoints CRUD de parqueaderos

//todos los parqueaderos (si es socio traera los parqueaderos asignados a él, si es admin todos en general)
router.get('/:userId', isAuthenticated, parkingController.getAllParkings);
//todos los vehiculos de un parqueadero (si es socio traera los vehiculos de un parqueadero asignado, si es admin todos los vehiculos de un parqueadero especifico)
router.get('/:userId/:parkingId', isAuthenticated, parkingController.getAllVehicles);
// (admin) crear parqueadero
router.post('/', isAuthenticated, isAdmin, parkingController.createParking);
// (admin) actualizar parqueadero
router.put('/:parkingId', isAuthenticated, isAdmin, parkingController.updateParking);
// (admin) borrar parqueadero
router.delete('/:parkingId', isAuthenticated, isAdmin, parkingController.deleteParking);
// (admin) asignar parqueadero a socio
router.post('/assign/:parkingId', isAuthenticated, isAdmin, parkingController.assignParkingToSocio);
// (socio) obtener ganancias
router.get('/:userId/:parkingId/earnings', isAuthenticated, isSocio, parkingController.getEarnings);


module.exports = router;