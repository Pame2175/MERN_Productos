import { Route, Routes } from 'react-router-dom';
import ListarCrearProduct from './ListarCrearProduct';
import DetalleProduct from './DetalleProduct';
import ProductFormUpdate from './components/ProductFormUpdate';

const App = () => {
    return (
        <div className='container mt-3'>
            <h1>CRUD Completo.</h1>
            <Routes>
                <Route path="/" element={<ListarCrearProduct />} />
                <Route path="/product/:id" element={<DetalleProduct />} />          
                <Route path="/product/:id/update" element={<ProductFormUpdate />} />          
            </Routes>
        </div>
    );
};

export default App;
