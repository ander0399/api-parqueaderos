const server  = require('./app.js');
const { conn } = require('./config/db.js');




conn.sync({ force: true }).then(async () => {
  console.log("base de datos conectada!");
  server.listen(process.env.PORT, () => {
    console.log(`api-parqueadero listening at ${process.env.PORT}`);
  });
});