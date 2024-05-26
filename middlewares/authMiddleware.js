const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


//verificar si esta logueado el usuario
exports.isAuthenticated = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(400).json({ message: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).json({ message: 'Token inválido' });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};


//verificar si es administrador
exports.isAdmin = (req, res, next) => {
  if (req.userRole !== 'ADMIN') return res.status(400).json({ message: 'Permiso denegado' });
  next();
};


//verificar si es socio
exports.isSocio = (req, res, next) => {
  if (req.userRole !== 'SOCIO') return res.status(400).json({ message: 'Permiso denegado' });
  next();
};