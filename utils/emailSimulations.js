exports.sendEmail = async (email, licensePlate, message, parkingName) => {
    console.log(`Correo enviado a ${email} con el mensaje: ${message} para el parqueadero: ${parkingName} y vehiculo con placa: ${licensePlate}`);
    return "Correo Enviado";
  };