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
    console.log(licensePlate," ",parkingId)
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
    res.status(201).json({ message:  vehicle });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


