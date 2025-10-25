const express = require('express');
const router = express.Router();
const db = require('../database/db');


router.get('/', (req, res) => {
  db.query('SELECT * FROM carrito', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


router.post('/agregar', (req, res) => {
  const { id, nombre, precio, cantidad } = req.body;

  db.query('SELECT * FROM carrito WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      
      const nuevaCantidad = results[0].cantidad + cantidad;
      db.query('UPDATE carrito SET cantidad = ? WHERE id = ?', [nuevaCantidad, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Cantidad actualizada correctamente' });
      });
    } else {
      
      db.query(
        'INSERT INTO carrito (id, nombre, precio, cantidad) VALUES (?, ?, ?, ?)',
        [id, nombre, precio, cantidad],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ mensaje: 'Producto agregado al carrito' });
        }
      );
    }
  });
});


router.delete('/eliminar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.query('DELETE FROM carrito WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Producto eliminado del carrito' });
  });
});


router.get('/total', (req, res) => {
  db.query('SELECT * FROM carrito', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const detalles = results.map(item => ({
      id: item.id,
      nombre: item.nombre,
      precio_unitario: item.precio,
      cantidad: item.cantidad,
      subtotal: item.precio * item.cantidad
    }));

    const total = detalles.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({ total, productos: detalles });
  });
});

module.exports = router;
