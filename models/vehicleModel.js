const { DataTypes } = require('sequelize')
//exportamos una funcion que define el modelo
//luego le injectamos la conexion a sequelize
module.exports = (sequilize) => {
  //defino el modelo
  sequilize.define('vehicle', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    licensePlate: { type: DataTypes.STRING, allowNull: false, validate: { len: 6 } },
    entryTime: { type: DataTypes.DATE, allowNull: false }
  });
}