const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');
require('dotenv').config();

exports.login = async (username, password, database) => {
  const user = await authRepository.findUserByUsername(username, database);
  if (!user) throw new Error('Usuario no encontrado');

  const isMatch = await bcrypt.compare(password, user.Usuario_Password);
  if (!isMatch) throw new Error('Contraseña incorrecta');

  const token = jwt.sign(
    { userId: user.Usuario_ID, username: user.Usuario_Login },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return { token, user };
};
