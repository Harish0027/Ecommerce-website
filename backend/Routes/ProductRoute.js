const express=require("express");
const ProductController = require("../Controllers/ProductControllers");
const UserAuthenticated = require("../Middlewares/UserAuthenticated");
const AuthoriseRole = require("../Middlewares/AuthoriseRole");
const ProductRouter=express.Router();

ProductRouter.get("/getAll",ProductController.getAllProducts);
ProductRouter.get("/get/:id",ProductController.getProductById);
ProductRouter.get("/admin/product/get/:id",UserAuthenticated,AuthoriseRole("admin"),ProductController.getProductById);
ProductRouter.delete("/admin/product/delete/:id",UserAuthenticated,AuthoriseRole("admin"),ProductController.deleteProduct);
ProductRouter.put("/admin/product/update/:id",UserAuthenticated,AuthoriseRole("admin"),ProductController.updateProduct);
ProductRouter.post("/admin/product/add",UserAuthenticated,AuthoriseRole("admin"), ProductController.addProduct);

// review
ProductRouter.put("/product/review",UserAuthenticated, ProductController.createProductReview);
ProductRouter.get("/product/getReviews/:id",UserAuthenticated, ProductController.getAllReviews);
ProductRouter.delete("/product/deleteReview/:id",UserAuthenticated, ProductController.deleteReviews);

module.exports=ProductRouter
