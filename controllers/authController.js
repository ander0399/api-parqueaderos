const authService = require('../services/authService');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
      const user = await authService.register(email, password, role);
      res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};