const { conn, History } = require('../config/db');


// registrar vehiculo en el historial al momento de salir
exports.createHistory = async (licensePlate, entryTime, exitTime,paid, parkingId) => {
  return await History.create({ licensePlate, entryTime, exitTime,paid, parkingId });
};


// Los 10 vehículos que más veces se han registrado en los diferentes parqueaderos y cuantas veces han sido
exports.getTopVehicles = async () => {
  const results = await History.findAll({
    attributes: [
      'licensePlate',
      [conn.fn('COUNT', conn.col('licensePlate')), 'registros']
    ],
    group: ['licensePlate'],
    order: [[conn.literal('registros'), 'DESC']],
    limit: 10
  });
  return results;
}


// los 10 vehículos que más veces se han registrado en un parqueadero y cuantas veces han sido
exports.getTopVehiclesParking = async (parkingId) => {
  const results = await History.findAll({
    attributes: [
      'licensePlate',
      [conn.fn('COUNT', conn.col('licensePlate')), 'registros']
    ],
    where: { parkingId },
    group: ['licensePlate'],
    order: [[conn.literal('registros'), 'DESC']],
    limit: 10
  });
  return results;
}

//ganancias dia
exports.getDailyEarnings = async (parkingId) => {
  const total = await History.sum('paid', {
    where: {
      parkingId,
      exitTime: {where :(conn.fn('DATE', conn.col('exitTime')), '=', conn.literal('CURRENT_DATE'))}
    }
  }) || 0.0;
  console.log(total);
  return total;
}

//ganancias semana
exports.getWeeklyEarnings = async (parkingId) => {
  return await History.sum('paid', {
    where: {
      parkingId,
      exitTime: {where:(conn.fn('YEARWEEK', conn.col('exitTime'), 1), '=', conn.fn('YEARWEEK', conn.literal('CURRENT_DATE'), 1))}
    }
  }) || 0;
}

//ganancias mes
exports.getMonthlyEarnings = async (parkingId) => {
  return await History.sum('paid', {
    where: {
      parkingId,
      exitTime:{where:(conn.fn('YEAR', conn.col('exitTime')), '=', conn.fn('YEAR', conn.literal('CURRENT_DATE')))},
      exitTime: {where:(conn.fn('MONTH', conn.col('exitTime')), '=', conn.fn('MONTH', conn.literal('CURRENT_DATE')))}
    }
  }) || 0;
}

//ganancias año
exports.getYearlyEarnings = async (parkingId) => {
  return await History.sum('paid', {
    where: {
      parkingId,
      exitTime: {where:(conn.fn('YEAR', conn.col('exitTime')), '=', conn.fn('YEAR', conn.literal('CURRENT_DATE')))}
    }
  }) || 0;
}