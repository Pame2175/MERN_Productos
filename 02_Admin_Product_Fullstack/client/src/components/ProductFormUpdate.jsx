import { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";

const ProductFormUpdate = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const initialValues = {
        productName: 'Cargando...',
        price: 0,
        description: 'Cargando...'
    };

    const { values: product, handleChange, setValues } = useForm(initialValues);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then(res => {
                console.log(res.data.product);
                setValues({
                    productName: res.data.product.productName,
                    price: res.data.product.price,
                    description: res.data.product.description
                });
            })
            .catch(err => console.log(err));
    }, []);

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/product/${id}`, product)
            .then(res => {
                console.log(res.data.product);
                Swal.fire({
                    icon: "success",
                    title: "¡Actualizado!",
                    text: "¡Actualizaste un producto!"
                });
                navigate("/");
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="text-danger">{error}</div>
            <div>
                <label className="mt-3">Nombre del producto: </label>
                <input type="text" className="form-control" name="productName" value={product.productName} onChange={handleChange} />
            </div>
            <div>
                <label className="mt-3">Precio: </label>
                <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} />
            </div>
            <div>
                <label className="mt-3">Descripción: </label>
                <textarea className="form-control" name="description" value={product.description} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Enviar</button>
            <button type="button" className="btn btn-danger mt-3 ms-3" onClick={() => navigate("/")}>Cancelar - Volver</button>
        </form>
    );
};

export default ProductFormUpdate;
