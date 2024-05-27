const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { isAuthenticated, isSocio } = require('../middlewares/authMiddleware');

// Endpoints de registro de entrada y salida de vehículos



// (socio) registrar entrada de vehiculo
router.post("/entry", isAuthenticated, isSocio, vehicleController.registerVehicleEntry);
// (socio) registrar salida de vehiculo
router.post("/exit", isAuthenticated, isSocio, vehicleController.registerVehicleExit);
// Los 10 vehículos que más veces se han registrado en los diferentes parqueaderos y cuantas veces han sido
router.get("/top-vehicles", isAuthenticated, vehicleController.getTopVehicles);
// los 10 vehículos que más veces se han registrado en un parqueadero y cuantas veces han sido
router.get("/top-vehicles/:parkingId",isAuthenticated, vehicleController.getTopVehiclesParking);
// verificar de los vehículos parqueados cuales son por primera vez en ese parqueadero
router.get("firts-time/:parkingId",isAuthenticated, vehicleController.getFirstTimeParkedVehicles);
// Buscar vehículos parqueados mediante coincidencia en la placa
router.get("/search/:query", isAuthenticated, vehicleController.searchParkedVehicles);


module.exports = router;