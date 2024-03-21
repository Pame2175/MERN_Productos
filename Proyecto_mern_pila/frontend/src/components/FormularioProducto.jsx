import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const FormularioProducto = () => {
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errores, setErrores] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/productos', {
        titulo,
        precio,
        descripcion
      });
      console.log('Producto creado:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Producto creado',
        text: 'El producto se ha creado correctamente.'
      });
    } catch (error) {
      console.error('Error al crear el producto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el producto',
        text: 'Por favor, revisa los datos ingresados.'
      });
    }
  };

  // Función para validar el formulario antes de enviarlo
  const validarFormulario = () => {
    let errores = {};

    if (!titulo.trim()) {
      errores.titulo = 'El título es requerido';
    }

    if (!precio.trim()) {
      errores.precio = 'El precio es requerido';
    } else if (isNaN(precio)) {
      errores.precio = 'El precio debe ser un número';
    }

    if (!descripcion.trim()) {
      errores.descripcion = 'La descripción es requerida';
    }

    setErrores(errores);

    return Object.keys(errores).length === 0;
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">Título:</label>
        <input type="text" className={`form-control ${errores.titulo && 'is-invalid'}`} id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        {errores.titulo && <div className="invalid-feedback">{errores.titulo}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="precio" className="form-label">Precio:</label>
        <input type="number" className={`form-control ${errores.precio && 'is-invalid'}`} id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">Descripción:</label>
        <textarea className={`form-control ${errores.descripcion && 'is-invalid'}`} id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
        {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
      </div>
      <button type="submit" className="btn btn-primary">Agregar Producto</button>
    </form>
  );
};

export default FormularioProducto;
