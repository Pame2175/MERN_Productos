const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        minlength: [3, "Product name must be at least 3 characters long"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [18, "Price must be at least 18"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [3, "Description must be at least 3 characters long"],
        validate: {
            validator: (value) => /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]*$/.test(value),
            message: "Description must contain only letters",
        },
    }
}, { timestamps: true });

module.exports.ProductModel = mongoose.model('Product', ProductSchema);
