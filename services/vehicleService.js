const vehicleRepository = require('../repositories/vehicleRepository');
const parkingRepository = require('../repositories/parkingRepository');
const historyRepository = require('../repositories/historyRepository');



//Entrada de un vehiculo
exports.registerVehicleEntry = async (licensePlate, parkingId) => {
    const entryTime = new Date();

    // Verificar si la placa ya está registrada en algún parqueadero
    const existingVehicle = await vehicleRepository.findVehicleByLicensePlate(licensePlate);
    if (existingVehicle) {
        return "No se puede Registrar Ingreso, ya existe la placa en este u otro parqueadero";
    }

    // Verificar si el parqueadero tiene capacidad disponible
    const parking = await parkingRepository.getParkingById(parkingId);
    if (parking.capacity == 0) {
        return "parqueadero lleno";
    }

    // Verificar la longitud de la placa del vehículo
    if (licensePlate.length !== 6 || !licensePlate.match(/^[0-9a-zA-Z]+$/)) {
        return "Verifique la placa del vehiculo";
    }

    // Registrar la entrada del vehículo
    const vehicleEntry = await vehicleRepository.registerVehicleEntry(licensePlate, parkingId, entryTime);
    await parkingRepository.decreaseParkingCapacity(parkingId);
    return vehicleEntry.id;
};

//salida de un vehiculo
exports.registerVehicleExit = async (licensePlate, parkingId) => {
    const exitTime = new Date();

    // Verificar si el vehículo está registrado en el parqueadero
    console.log("placa ", licensePlate)
    const vehicle = await vehicleRepository.findVehicleByLicensePlate(licensePlate);
    console.log("vehiculo ", vehicle)
    if (vehicle) {
        if (vehicle.parkingId == parkingId) {
            // Registrar la salida del vehículo y moverlo al historial
            await historyRepository.createHistory(licensePlate, vehicle.entryTime, exitTime, parkingId);
            await vehicleRepository.registerVehicleExit(vehicle);
            await parkingRepository.increaseParkingCapacity(parkingId);
            return 'Salida registrada';
        }
    } else {
        return 'No se puede Registrar Salida, no existe la placa en el parqueadero';
    }
};


//obtener vehiculos de un parqueadero
exports.getVehiclesByParkingId = async (parkingId) => {
    return await vehicleRepository.getVehiclesByParkingId(parkingId);
};


//obtener detalle de un vehiculo de un parqueadero
exports.getVehicleDetailByParkingId = async (parkingId, vehicleId) => {
    return await vehicleRepository.getVehicleDetailByParkingId(parkingId, vehicleId);
};


