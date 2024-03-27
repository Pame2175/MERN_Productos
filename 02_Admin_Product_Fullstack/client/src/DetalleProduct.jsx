import { useParams, Link } from "react-router-dom";
import useAxios from "./hooks/useAxios";
import moment from 'moment/min/moment-with-locales'; // Importa Moment.js con todos los locales

const DetalleProduct = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useAxios(`http://localhost:8000/api/product/${id}`);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    const { product } = data;

    return (
        <div className="row">
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{product.productName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">ID: {product._id}</h6>
                        <ul>
                            <li>Precio: {product.price}</li>
                            <li>Descripción: {product.description}</li>
                            <li>Creado: {moment(product.createdAt).fromNow()}</li>
                            <li>Actualizado: {moment(product.updatedAt).fromNow()}</li>
                        </ul>
                        <Link to="/" className="card-link">Volver</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleProduct;
