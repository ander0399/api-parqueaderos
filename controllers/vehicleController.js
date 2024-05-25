const vehicleService = require('../services/vehicleService');

//obtener todos los vehiculos
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.json(vehicles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//obtener vehiculo por id
exports.getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await vehicleService.getVehicleById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehiculo no encontrado' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//registrar entrada de un vehiculo
exports.registerVehicleEntry = async (req, res) => {
    try {
      const { licensePlate, parkingId } = req.body;
      await vehicleService.registerVehicleEntry(licensePlate, parkingId);
      res.status(201).json({ message: 'Registro de vehiculo exitoso' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };



//registrar salida de un vehiculo
exports.registerVehicleExit = async (req, res) => {
    try {
      const { licensePlate, parkingId } = req.body;
      const vehicle = await vehicleService.registerVehicleExit(licensePlate, parkingId);
      res.json({ message: 'Salida registrada', vehicle });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };












//obtener vehiculos de un parqueadero
exports.getVehiclesByParkingId = async (req, res) => {
  try {
    const { parkingId } = req.params;
    const vehicles = await vehicleService.getVehiclesByParkingId(parkingId);
    res.json(vehicles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//obtener detalles de un vehiculo en un parqueadero
  exports.getVehicleDetailByParkingId = async (req, res) => {
    try {
      const { parkingId, vehicleId } = req.params;
      const vehicle = await vehicleService.getVehicleDetailByParkingId(parkingId, vehicleId);
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehiculo no encontrado' });
      }
      res.json(vehicle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };