const emailService = require('../utils/emailSimulations.js');


//enviar email
exports.send = async (req, res) => {
  try {
    const { email, licensePlate, message, parkingName } = req.body;
    const sendEmail = await emailService.sendEmail(email ,licensePlate, message, parkingName);
    res.status(200).json({ message: sendEmail });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};