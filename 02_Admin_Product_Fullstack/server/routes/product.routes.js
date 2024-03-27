const express = require("express");

const ProductController = require("../controllers/product.controller");

const ProductRouter = express.Router();

// API/PRODUCTO/
ProductRouter.post("/", ProductController.createNewProduct);
ProductRouter.get("/", ProductController.getAllProducts);
ProductRouter.get("/:id", ProductController.getOneProductById);
ProductRouter.put("/:id", ProductController.updateOneProductById);
ProductRouter.delete("/:id", ProductController.deleteOneProductById);

module.exports = ProductRouter;
