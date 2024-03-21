const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');//configuracion quien tiene acceso a aesta pagina

const app = express();
app.use(express.json());
app.use(cors());

const productoRoutes = require('./routes/productoRoutes');
app.use('/api/productos', productoRoutes);

mongoose.connect('mongodb://localhost:27017/nombre_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión a la base de datos establecida');
  app.listen(5001, () => console.log('Servidor corriendo en el puerto 5001'));
}).catch(error => console.error('Error al conectar a la base de datos:', error));
