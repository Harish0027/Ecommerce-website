const express=require("express");
const ProductController = require("../Controllers/ProductControllers");

const ProductRouter=express.Router();

ProductRouter.get("/getAll",ProductController.getAllProducts);
ProductRouter.get("/get/:id",ProductController.getProductById);
ProductRouter.delete("/delete/:id",ProductController.deleteProduct);
ProductRouter.put("/update/:id",ProductController.updateProduct);
ProductRouter.post("/add", ProductController.addProduct);


module.exports=ProductRouter