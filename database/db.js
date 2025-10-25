const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           
  password: 'n0m3l0',           
  database: 'carrito_db',
  charset: 'utf8mb4_general_ci'
});


db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos MySQL (Unicode listo).');
  }
});

module.exports = db;
