const parkingService = require('../services/parkingService');
const authService = require("../services/authService");
const vehicleService = require("../services/vehicleService");

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

//obtener todos los parqueaderos de un socio o un admin puede ver todos los parqueaderos
exports.getAllParkings = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await authService.userById(userId);
        let parkings = 0;
        if (user.role == "SOCIO") {
            parkings = await parkingService.getParkingsByUserId(userId);
        } else {
            parkings = await parkingService.getAllParkings();
        }
        res.status(201).json({ parkings });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//obtener todos los vehiculos de un parqueadero asignados a un socio o un admin puede ver todos los vehiculos
exports.getAllVehicles = async (req, res) => {
    try {
        const { userId, parkingId } = req.params;
        const parking = await parkingService.getParkingById(parkingId);
        const user = await authService.userById(userId);
        let vehicles = 0;
        if (user.role == "SOCIO" && parking.userId == userId) {
            vehicles = await vehicleService.getVehiclesByParkingId(parkingId);
            return res.status(201).json({ vehicles });
        }

        if (user.role == "ADMIN") {
            vehicles = await vehicleService.getVehiclesByParkingId(parkingId);
            return res.status(201).json({ vehicles });
        }
        res.status(400).json({ message: "no tienes acceso a este parqueadero" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//obtener un parqueadero por id
exports.getParkingById = async (req, res) => {
    try {
        const { id } = req.params;
        const parking = await parkingService.getParkingById(id);
        res.status(201).json(parking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//actualizar un parqueadero
exports.updateParking = async (req, res) => {
    try {
        const { parkingId } = req.params;
        const { name, capacity, costPerHour } = req.body;
        const updatedParking = await parkingService.updateParking(parkingId, name, capacity, costPerHour);
        res.status(201).json({ updatedParking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//Borrar un parqueadero por id
exports.deleteParking = async (req, res) => {
    try {
        const { parkingId } = req.params;
        const deleted = await parkingService.deleteParking(parkingId);
        res.status(201).json({ deleted });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//asignar parqueadero a un socio
exports.assignParkingToSocio = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const { parkingId } = req.params;
        const updatedParking = await parkingService.assignParkingToSocio(parkingId, userEmail);
        res.status(201).json({ updatedParking });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//obtener los parqueaderos de un socio
exports.getParkingsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const parkings = await parkingService.getParkingsByUserId(userId);
        res.status(200).json(parkings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// obtener ganancias
exports.getEarnings = async (req, res) => {
    try {
        console.log("entramos")
        const { parkingId } = req.params;
        console.log(parkingId)
        const dailyEarnings = await parkingService.getDailyEarnings(parkingId);
        console.log("ganancias dia: ", dailyEarnings)
          const weeklyEarnings = await parkingService.getWeeklyEarnings(parkingId);
          const monthlyEarnings = await parkingService.getMonthlyEarnings(parkingId);
          const yearlyEarnings = await parkingService.getYearlyEarnings(parkingId);
        res.status(201).json({
            ganancias_hoy: dailyEarnings,
            ganancias_semana: weeklyEarnings,
            ganancias_mes: monthlyEarnings,
            ganancias_anio: yearlyEarnings
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
