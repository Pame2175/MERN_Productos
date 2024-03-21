// controllers/productoController.js

const Producto = require('../models/Producto');

// Controlador para crear un nuevo producto
exports.crearProducto = async (req, res) => {
  try {
    const { titulo, precio, descripcion } = req.body;
    const nuevoProducto = new Producto({ titulo, precio, descripcion });
    await nuevoProducto.save();
    res.status(201).json({ mensaje: 'Producto creado correctamente', producto: nuevoProducto });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ mensaje: 'Error al crear el producto', error });
  }
};

// Controlador para obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json({ productos });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ mensaje: 'Error al obtener los productos', error });
  }
};




