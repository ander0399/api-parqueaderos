const express = require('express');
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const auth = require('./routes/authRoutes');
const parking = require('./routes/parkingRoutes');
const vehicle = require('./routes/vehicleRoutes');
const email = require('./routes/emailRoutes');
const server = express();

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

server.use('/auth', auth);
server.use('/parkings', parking);
server.use('/vehicles', vehicle);
server.use('/email', email);


module.exports = server;