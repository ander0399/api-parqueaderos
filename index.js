const server = require('./app.js');
const { conn, User, Parking, Vehicle, History } = require('./config/db.js');
const consumir = require("./consumir/consumir.json");
const registrar = require("./services/authService.js"); 

async function loadDB() {
  const verifyUserBd = await User.findAll();
  const verifyParkingBd = await Parking.findAll();
  const verifyVehicleBd = await Vehicle.findAll();
  const verifyHistoryBd = await History.findAll();

  if (verifyUserBd.length == 0 || verifyParkingBd.length == 0 || verifyVehicleBd.length == 0 || verifyHistoryBd.length == 0) {
    await User.bulkCreate(consumir.users);
    await Parking.bulkCreate(consumir.parkings);
    await Vehicle.bulkCreate(consumir.vehicles);
    await History.bulkCreate(consumir.history);

   
    console.log('Datos cargados correctamente en la basa de datos');

  }
};



conn.sync({ force: true }).then(async () => {
  loadDB();
  console.log("base de datos conectada!");
  server.listen(process.env.PORT, () => {
    console.log(`api-parqueadero listening at ${process.env.PORT}`);
  });
});