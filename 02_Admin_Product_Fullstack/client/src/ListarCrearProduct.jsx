import { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function ListarCrearProductos() {

    const [products, setProducts] = useState(null);

    const updateProducts = (product) => {
        setProducts([...products, product]);
    };

    return (
        <div className='row'>
            <div className='col-8'>
                <h3 className='mt-5'>Listado de Productos</h3>
                <hr />
                <ProductList products={products} setProducts={setProducts} />
            </div>
            <div className='col-4'>
                <h3 className='mt-5'>Ingreso de Producto</h3>
                <hr />
                <ProductForm updateProducts={updateProducts} />
            </div>
        </div>
    );
}

export default ListarCrearProductos;
