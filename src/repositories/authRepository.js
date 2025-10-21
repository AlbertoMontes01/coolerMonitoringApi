const { getConnection, sql } = require('../config/db');

exports.findUserByUsername = async (username, database) => {
  const pool = await getConnection(database);

  console.log(`🔎 Consultando usuario: ${username} en base: ${database}`);

  const query = `
    SELECT 
      Usuario_Login,
      CONVERT(VARCHAR(300), DECRYPTBYPASSPHRASE('3KtHj&;vX$', Usuario_Contra)) AS Usuario_Contra,
      Usuario_Cve, Usuario_Nombre, Telefono
    FROM usuarios2
    WHERE Usuario_Activo = 1 AND Usuario_Login = @username
  `;

  const result = await pool.request()
    .input('username', sql.VarChar, username)
    .query(query);

  return result.recordset[0];
};
