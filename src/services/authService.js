const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');
require('dotenv').config();

exports.login = async (username, password, database) => {
  const user = await authRepository.findUserByUsername(username, database);
  if (!user) throw new Error('Usuario no encontrado o inactivo');

  const dbPassword = user.Usuario_Contra?.toLowerCase();
  const inputPassword = password.toLowerCase();

  if (dbPassword !== inputPassword) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign(
    { userId: user.Usuario_Cve, username: user.Usuario_Login },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return { token, user };
};
