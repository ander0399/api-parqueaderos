const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const userRepository = require('../repositories/userRepository');


//login de usuario
exports.login = async (email, password) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '6h' });
    return token;
};


//registrar socio
exports.register = async (email, password, role) => {
    if(role != "SOCIO"){ throw new Error("Solo se pueden agregar Socios")}
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser(email, hashedPassword, role);
    return user;
};