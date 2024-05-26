const { Parking } = require('../config/db');


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
exports.updateParking = async (parking) => {
    var values = { name: parking.name, capacity:parking.capacity,costPerHour:parking.costPerHour,userId:parking.userId};
    var condition = { where: { id: parking.id } };
    return await Parking.update(values,condition);
};

//borrar parqueadero
exports.deleteParking = async (id) => {
    return await Parking.destroy({ where: { id } });
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

//cupo en el parqueadero
exports.checkCapacityAvailable = async (parkingId) => {
    return await Parking.capacity;
}
