const vehicleRepository = require('../repositories/vehicleRepository');
const parkingRepository = require('../repositories/parkingRepository');
const historyRepository = require('../repositories/historyRepository');



//Entrada de un vehiculo
exports.registerVehicleEntry = async (req, res) => {
    try {
        const { licensePlate, parkingId } = req.body;
        const entryTime = new Date();

        // Verificar si la placa ya está registrada en algún parqueadero
        const existingVehicle = await vehicleRepository.findVehicleByLicensePlate(licensePlate);
        if (existingVehicle) {
            res.status(400).json({ message: 'Vehiculo ya esta en el parqueadero' });
        }

        // Verificar si el parqueadero tiene capacidad disponible
        const capacityAvailable = await parkingRepository.checkCapacityAvailable(parkingId);
        if (!capacityAvailable) {
            res.status(400).json({ message: 'parqueadero lleno' });
        }

        // Verificar la longitud de la placa del vehículo
        if (licensePlate.length !== 6 || !licensePlate.match(/^[0-9a-zA-Z]+$/)) {
            res.status(400).json({ message: 'Verifique la placa del vehiculo' });
        }

        // Registrar la entrada del vehículo
        await vehicleRepository.registerVehicleEntry(licensePlate, parkingId, entryTime);
        await parkingRepository.decreaseParkingCapacity(parkingId);
        res.status(201).json({ message: 'vehiculo registrado en el parqueadero' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//salida de un vehiculo
exports.registerVehicleExit = async (req, res) => {
    try {
        const { licensePlate, parkingId } = req.body;
        const exitTime = new Date();

        // Verificar si el vehículo está registrado en el parqueadero
        const vehicle = await vehicleRepository.findVehicleByLicensePlateAndParkingId(licensePlate, parkingId);
        if (!vehicle) {
            res.status(400).json({ message: 'Vehiculo no encontrado en el parqueadero' });
        }

        // Registrar la salida del vehículo y moverlo al historial
        await historyRepository.createHistory(licensePlate, vehicle.entryTime, exitTime, parkingId);
        await vehicleRepository.registerVehicleExit(vehicle);
        await vehicleRepository.increaseParkingCapacity(parkingId);
        res.status(200).json({ message: 'El vehiculo ha salido del parqueadero' });
    } catch (error) {
        res.status(400).json({ message: error.message });
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


