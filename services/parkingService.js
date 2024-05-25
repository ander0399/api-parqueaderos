const parkingRepository = require('../repositories/parkingRepository');
const userRepository = require('../repositories/userRepository'); 


//crear un parqueadero
exports.createParking = async (name, capacity, costPerHour) => {
  return await parkingRepository.createParking(name, capacity, costPerHour);
};

//obtener todos los parqueaderos
exports.getAllParkings = async () => {
  return await parkingRepository.getAllParkings();
};

//obtener un parqueadero por id
exports.getParkingById = async (id) => {
  return await parkingRepository.getParkingById(id);
};

//actualizar un parqueadero
exports.updateParking = async (id, data) => {
    const vehiclesCount = await vehicleRepository.getVehiclesCountByParkingId(id);
  if (vehiclesCount > 0) {
    throw new Error('Parqueadero no puede ser actualizado porque aun tiene vehiculos');
  }
  return await parkingRepository.updateParking(id, data);
};

//borrar un parqueadero
exports.deleteParking = async (id) => {

 const vehiclesCount = await vehicleRepository.getVehiclesCountByParkingId(id);
  if (vehiclesCount > 0) {
    throw new Error('Parqueadero no puede ser borrado porque aun tiene vehiculos');
  }
  await parkingRepository.deleteParking(id);
};

//obtener parqueaderos asignados a un socio
exports.getParkingsByUserId = async (userId) => {
  return await parkingRepository.getParkingsByUserId(userId);
};

//asignar un parqueadero a un socio
exports.assignParkingToSocio = async (parkingId, userId) => {
  const parking = await parkingRepository.getParkingById(parkingId);
  if (!parking) {
    throw new Error('Parqueadero no encontrado');
  }
  const user = await userRepository.getUserById(userId);
  if (!user || user.role !== 'SOCIO') {
    throw new Error('Usuario no encontrado o no es un SOCIO');
  }
  parking.userId = userId;
  await parking.save();
  return parking;
};


