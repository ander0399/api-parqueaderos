const vehicleService = require('../services/vehicleService');


// //obtener vehiculo por id
// exports.getVehicleById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const vehicle = await vehicleService.getVehicleById(id);
//     if (!vehicle) {
//     res.status(400).json({ message: 'Vehiculo no encontrado' });
//     }else{
//       res.status(201).json({vehicle});
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

//registrar entrada de un vehiculo
exports.registerVehicleEntry = async (req, res) => {
  try {
    const { licensePlate, parkingId } = req.body;
    console.log(licensePlate, " ", parkingId)
    const registerVehicle = await vehicleService.registerVehicleEntry(licensePlate, parkingId);
    res.status(201).json({ message: registerVehicle });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//registrar salida de un vehiculo
exports.registerVehicleExit = async (req, res) => {
  try {
    const { licensePlate, parkingId } = req.body;
    const vehicle = await vehicleService.registerVehicleExit(licensePlate, parkingId);
    res.status(201).json({ message: vehicle });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Los 10 vehículos que más veces se han registrado en los diferentes parqueaderos y cuantas veces han sido
exports.getTopVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getTopVehicles();
    res.status(201).json({ vehicles });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


// los 10 vehículos que más veces se han registrado en un parqueadero y cuantas veces han sido
exports.getTopVehiclesParking = async (req, res) => {
  try {
    const { parkingId } = req.params;
    const vehicles = await vehicleService.getTopVehicles(parkingId);
    res.status(201).json({ vehicles });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

//verificar de los vehículos parqueados cuales son por primera vez en ese parqueadero
exports.getFirstTimeParkedVehicles = async (req, res) => {
  try {
    const { parkingId } = req.params;
    const vehicles = await vehicleService.getFirstTimeParkedVehicles(parkingId);
    res.status(201).json({vehicles});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


// Buscar vehículos parqueados mediante coincidencia en la placa
exports.searchParkedVehicles = async (req, res) => {
  try {
    const { query } = req.params;
    const vehicles = await vehicleService.searchParkedVehicles(query);
    res.status(201).json({vehicles});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}