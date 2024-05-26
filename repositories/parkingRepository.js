const Parking = require('../config/db');


//crear un parqueadero
exports.createParking = async (name, capacity, costPerHour) => {
    return await Parking.create({ name, capacity, costPerHour });
};

//obtener todos los parqueaderos
exports.getAllParkings = async () => {
    return await Parking.findAll();
};

//parqueadero por id
exports.getParkingById = async (id) => {
    return await Parking.findByPk(id);
};

//actualizar parqueadero
exports.updateParking = async (id, data) => {
    const parking = await Parking.findByPk(id);
    if (!parking) {
        return null;
    }
    return await parking.update(data);
};

//borrar parqueadero
exports.deleteParking = async (id) => {
    const parking = await Parking.findByPk(id);
    if (!parking) {
        return null;
    }
    return await parking.destroy();
};

//asignar parqueadero a un socio
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

//cuantos vehiculos hay en el parqueadero
exports.getVehiclesCountByParkingId = async (parkingId) => {
    return await Vehicle.count({ where: { parkingId } });
};

//incrementar capacidad del parqueadero
exports.increaseParkingCapacity = async (parkingId) => {
    await Parking.increment('capacity', { where: { id: parkingId } });
};

//decrementar capacidad del parqueadero
exports.decreaseParkingCapacity = async (parkingId) => {
    await Parking.decrement('capacity', { where: { id: parkingId } });
};

//todos los parqueaderos de un socio
exports.getParkingsByUserId = async (userId) => {
    return await Parking.findAll({ where: { userId } });
}