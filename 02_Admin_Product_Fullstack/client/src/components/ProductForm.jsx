import { useState } from "react";
import useForm from "../hooks/useForm";
import axios from "axios";
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const ProductForm = ({ updateProducts }) => {

    const initialValues = {
        productName: '',
        price: 0,
        description: ''
    };
    const { values: product, handleChange, clearData } = useForm(initialValues);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/product', product)
            .then(res => {
                console.log(res.data.product);
                updateProducts(res.data.product);
                clearData();
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: "¡Producto agregado exitosamente!",
                });
                setError("");
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
                <label className="mt-3">Product Name: </label>
                <input type="text" className="form-control" name="productName" value={product.productName} onChange={handleChange} />
            </div>
            <div>
                <label className="mt-3">Price: </label>
                <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} />
            </div>
            <div>
                <label className="mt-3">Description: </label>
                <textarea className="form-control" name="description" value={product.description} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
    );
};

ProductForm.propTypes = {
    updateProducts: PropTypes.func
};

export default ProductForm;
