const { conn, Vehicle } = require('../config/db');


//registrar vehiculo
exports.registerVehicleEntry = async (licensePlate, parkingId, entryTime) => {
  return await Vehicle.create({ licensePlate, entryTime, parkingId });
};

//obtener vehiculo de un parqueadero
exports.getVehiclesByParkingId = async (parkingId) => {
  return await Vehicle.findAll({ where: { parkingId } });
};

//obtener vehiculo por placa
exports.findVehicleByLicensePlate = async (licensePlate) => {
  return await Vehicle.findOne({ where: { licensePlate } });
};

//salida de vehiculo (pendiente)
exports.registerVehicleExit = async (vehicle) => {
  return await vehicle.destroy({ where: { id: vehicle.id } });
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


// verificar de los vehículos parqueados cuales son por primera vez en ese parqueadero
exports.getFirstTimeParkedVehicles = async (parkingId) => {
  const results = await Vehicle.findAll({
    attributes: ['licensePlate'],
    where: { parkingId },
    include: [{
      model: History,
      where: {
        parkingId: {where:(conn.col('Vehicle.parkingId'), conn.col('History.parkingId'))}
      },
      required: false
    }],
    group: ['Vehicle.licensePlate'],
    having: conn.literal('COUNT(History.licensePlate) = 0')
  });
  return results.map(result => result.licensePlate);
}


//Buscar vehículos parqueados mediante coincidencia en la placa
exports.searchParkedVehicles = async (query) => {
  const results = await Vehicle.findAll({
    where: {
      licensePlate: {
        [Op.like]: `%${query}%`
      }
    }
  });
  return results;
}