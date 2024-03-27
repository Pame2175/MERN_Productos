import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const ProductList = ({ products, setProducts }) => {

    const deleteProduct = (productId) => {
        Swal.fire({
            title: "¿Seguro que deseas eliminar?",
            text: "Estás a punto de eliminar un producto.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8000/api/product/${productId}`)
                .then(res => {
                    console.log(res);
                    Swal.fire({
                        icon: "success",
                        title: "¡Eliminado!",
                        text: "Has eliminado un producto."
                    });
                    setProducts(products.filter(product => product._id !== productId));
                });
            }
        });
    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/product")
            .then((response) => {
                console.log(response.data.products);
                setProducts(response.data.products);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, [setProducts]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <table className="table table-striped table-hover mt-5">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(product => (
                        <tr key={product._id}>
                            <td>{product.productName}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <Link to={`/product/${product._id}`} className="btn btn-outline-primary btn-sm me-1">Detalle</Link>
                                <Link to={`/product/${product._id}/update`} className="btn btn-outline-warning btn-sm me-1">Actualizar</Link>
                                <button onClick={() => deleteProduct(product._id)} className="btn btn-outline-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

ProductList.propTypes = {
    products: PropTypes.array,
    setProducts: PropTypes.func.isRequired
};

export default ProductList;
