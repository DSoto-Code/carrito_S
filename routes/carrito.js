const express = require('express');
const router = express.Router();

let cart = [];

router.get('/', (req, res) => {
  res.json(cart);
});

router.post('/agregar', (req, res) => {
  const { id, nombre, precio, cantidad } = req.body;
  const productoExistente = cart.find(item => item.id === id);

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    cart.push({ id, nombre, precio, cantidad });
  }

  res.json({ mensaje: 'Producto agregado al carrito', carrito: cart });
});

router.delete('/eliminar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(item => item.id !== id);
  res.json({ mensaje: 'Producto eliminado', carrito: cart });
});

router.get('/total', (req, res) => {
  const detalles = cart.map(item => ({
    id: item.id,
    nombre: item.nombre,
    precio_unitario: item.precio,
    cantidad: item.cantidad,
    subtotal: item.precio * item.cantidad
  }));

  const total = detalles.reduce((sum, item) => sum + item.subtotal, 0);

  res.json({
    total,
    productos: detalles
  });
});

module.exports = router;
