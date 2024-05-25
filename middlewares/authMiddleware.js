const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticated = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.userRole !== 'ADMIN') return res.status(403).json({ message: 'Permiso denegado' });
  next();
};

exports.isSocio = (req, res, next) => {
  if (req.userRole !== 'SOCIO') return res.status(403).json({ message: 'Permiso denegado' });
  next();
};