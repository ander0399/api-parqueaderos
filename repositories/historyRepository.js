const History = require('../models/historyModel');

exports.createHistory = async (licensePlate, entryTime, exitTime, parkingId) => {
  return await History.create({ licensePlate, entryTime, exitTime, parkingId });
};