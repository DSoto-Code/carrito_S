const express = require('express');
const app = express();
const carritorutas = require('./routes/carrito.js');

app.use(express.json());
app.use('/carrito', carritorutas);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
