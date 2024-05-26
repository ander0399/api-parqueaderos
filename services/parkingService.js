const parkingRepository = require('../repositories/parkingRepository');
const userRepository = require('../repositories/userRepository');
const vehicleRepository = require("../repositories/vehicleRepository");


//crear un parqueadero
exports.createParking = async (name, capacity, costPerHour) => {
  return await parkingRepository.createParking(name, capacity, costPerHour);
};

//obtener todos los parqueaderos
exports.getAllParkings = async () => {
  return await parkingRepository.getAllParkings();
};

//obtener parqueaderos asignados a un socio
exports.getParkingsByUserId = async (userId) => {
  const parkings = await parkingRepository.getParkingsByUserId(userId);
  if (parkings) return parkings;
  return "no tiene parqueaderos";
};

//obtener un parqueadero por id
exports.getParkingById = async (id) => {
  return await parkingRepository.getParkingById(id);
};

//actualizar un parqueadero
exports.updateParking = async (id, name, capacity, costPerHour) => {
  if (id && name && capacity && costPerHour) {
    let parking = await parkingRepository.getParkingById(id);
    parking.name = name;
    parking.capacity = capacity;
    parking.costPerHour = costPerHour;
    if (parking) {
      await parkingRepository.updateParking(parking);
      return "parqueadero actualizado";
    } else {
      return "parqueadero no encontrado";
    }
  } else {
    return "faltan datos";
  }
};

//borrar un parqueadero
exports.deleteParking = async (id) => {
  const parking = parkingRepository.getParkingById(id);
  const vehiclesCount = await vehicleRepository.getVehiclesCountByParkingId(id);
  if (parking) {
    if (vehiclesCount > 0) {
      return 'Parqueadero no puede ser borrado porque aun tiene vehiculos';
    } else {
      await parkingRepository.deleteParking(id);
      return "borrado";
    }
  } else {
    return "Parqueadero no encontrado";
  }
};


//asignar un parqueadero a un socio
exports.assignParkingToSocio = async (parkingId, userEmail) => {
  const parking = await parkingRepository.getParkingById(parkingId);
  if (parking) {
    const user = await userRepository.findByEmail(userEmail);
    if (!user || user.role !== 'SOCIO') {
      return 'Usuario no encontrado o no es un SOCIO';
    } else {
      parking.userId = user.id;
      const parkingUpdate = await parkingRepository.updateParking(parking);
      console.log(parkingUpdate)
      return "parqueadero asignado correctamente";
    }
  }
  return 'Parqueadero no encontrado';
};


//obtener la capacidad del parqueadero
exports.checkCapacityAvailable = async (parkingId) => {
  return await parkingRepository.checkCapacity(parkingId);
};


