const {Vehicle} = require('../config/db');


//registrar vehiculo
exports.registerVehicleEntry = async (licensePlate, parkingId, entryTime) => {
   return await Vehicle.create({ licensePlate,entryTime, parkingId});
  };

//obtener vehiculo de un parqueadero
exports.getVehiclesByParkingId = async (parkingId) => {
    return await Vehicle.findAll({ where: { parkingId } });
};

//obtener vehiculo por placa
exports.findVehicleByLicensePlate = async (licensePlate) => {
    return await Vehicle.findOne({ where: { licensePlate } });
};

//obtener un vehiculo en un parqueadero con la placa
exports.findVehicleByLicensePlateAndParkingId = async (licensePlate, parkingId) => {
    return await Vehicle.findOne({ where: { licensePlate, parkingId } });
  };
  

//salida de vehiculo (pendiente)
  exports.registerVehicleExit = async (vehicle) => {
    // Mover el vehículo al historial con la fecha de salida
    return await vehicle.destroy();
  };

//cantidad de vehiculos en un parqueadero
exports.getVehiclesCountByParkingId = async (parkingId) => {
    return await Vehicle.count({ where: { parkingId } });
};

//obtener vehiculos de un parqueadero en especifico
exports.getVehiclesByParkingId = async (parkingId) => {
    return await Vehicle.findAll({ where: { parkingId } });
};

//obtener detalle de un vehiculo en un parqueadero en especifico
exports.getVehicleDetailByParkingId = async (parkingId, vehicleId) => {
    return await Vehicle.findOne({ where: { id: vehicleId, parkingId } });
};
