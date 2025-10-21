const sql = require('mssql');

(async () => {
  try {
    const pool = await sql.connect({
      user: 'sistema-soi',
      password: 'S1s73m4.#%!!S01_T102245236',
      server: 'corporativo.h52.mx',
      database: 'CorporativoH52',
      options: { encrypt: false, trustServerCertificate: true }
    });
    console.log('✅ Conexión exitosa!');
    const result = await pool.request().query('SELECT TOP 1 * FROM sysobjects');
    console.log(result.recordset[0]);
  } catch (err) {
    console.error('❌ Error de conexión:', err.message);
  }
})();
