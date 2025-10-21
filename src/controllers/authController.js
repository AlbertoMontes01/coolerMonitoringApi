const authService = require('../services/authService');

exports.login = async (req, res) => {
  try {
    const { username, password, database } = req.body;
    const { token, user } = await authService.login(username, password, database);
    res.json({ message: 'Login exitoso', token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
