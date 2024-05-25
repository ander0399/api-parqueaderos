const emailService = require('../utils/emailSimulations.js');

exports.send = async (req, res) => {
  try {
    const { email, licensePlate, message, parkingName } = req.body;
    await emailService.sendEmail(email ,licensePlate, message, parkingName);
    res.status(200).json({ message: 'Email enviado' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};