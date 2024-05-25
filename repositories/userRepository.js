const User = require('../models/userModel');

//obtener usuario por email
exports.findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

//crear usuario 
exports.createUser = async (email, password, role) => {
  return await User.create({ email, password, role });
};

//obtener usuario por id
exports.getUserById = async (id) => {
  return await User.findByPk(id);
};