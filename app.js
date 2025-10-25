const express = require('express');
const app = express();
const carritorutas = require('./routes/carrito');
const db = require('./database/db.js'); 


app.use(express.json());

const cors = require('cors');
app.use(cors());
app.use(express.static('public'));



app.use('/carrito', carritorutas);

db.connect((err) => {
  if (err) {
    console.error('No se conectó la base de datos', err.message);
  } else {
    console.log('La conexión se ha establecido correctamente.');
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
