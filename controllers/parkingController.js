const parkingService = require('../services/parkingService');


//crear parqueadero
exports.createParking = async (req, res) => {
    const { name, capacity, costPerHour } = req.body;
    try {
        const parking = await parkingService.createParking(name, capacity, costPerHour);
        res.status(201).json(parking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//obtener todos los parqueaderos
exports.getAllParkings = async (req, res) => {
    try {
        const parkings = await parkingService.getAllParkings();
        res.json(parkings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//obtener un parqueadero por id
exports.getParkingById = async (req, res) => {
    try {
        const id = req.body;
        const parking = await parkingService.getParkingById(id);
        res.status(201).json(parking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//actualizar un parqueadero
exports.updateParking = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, capacity, costPerHour } = req.body;
        const updatedParking = await parkingService.updateParking(id, name, capacity, costPerHour);
        res.json(updatedParking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//Borrar un parqueadero por id
exports.deleteParking = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await parkingService.deleteParking(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Parqueadero no encontrado' });
        }
        res.json({ message: 'Parqueadero borrado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//asignar parqueadero a un socio
exports.assignParkingToSocio = async (req, res) => {
    try {
      const { parkingId, userId } = req.body;
      const updatedParking = await parkingService.assignParkingToSocio(parkingId, userId);
      res.status(200).json(updatedParking);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

//obtener los parqueaderos de un socio
  exports.getParkingsByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const parkings = await parkingService.getParkingsByUserId(userId);
      res.json(parkings);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };