const ProductModel = require("../Model/ProductModel");
const ErrorHandler=require("../utils/ErrorHandler");

const ProductController = {
  getAllProducts: async (req, res,next) => {
    try {
      const products = await ProductModel.find();
      return res.status(200).json({
        success: true,
        data: products,
        message: "All products fetched successfully"
      });
    } catch (error) {
        return next("Failed to fetch products",500)
    }
  },

  addProduct: async (req, res) => {
    try {
      const newProduct = await ProductModel.create(req.body); // no need to save again
      return res.status(201).json({
        success: true,
        data: newProduct,
        message: "Product added successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to add new product",
        error: error.message
      });
    }
  },
  updateProduct : async (req, res) => {
    try {
      // 1. Find product by ID
      let product = await ProductModel.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
  
      product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,             
      });
  
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong while updating product",
        error: error.message
      });
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const productId = req.params.id;
  
      const product = await ProductModel.findByIdAndDelete(productId);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
  
      res.status(200).json({
        success: true,
        message: "The product was deleted successfully!",
        data: product
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete product!",
        error: error.message
      });
    }
  },
  getProductById:async(req,res)=>{
      try{
        const pId=req.params.id
        const product=await ProductModel.findById(pId);

        if (!product) {
            return res.status(404).json({
              success: false,
              message: "Product not found"
            });
          }
        
          res.status(200).json({message:"Product Fetched successfully!!!",data:product,success:true});
      }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to fetch product!",
            error: error.message
          });
      }
  }
  
};

module.exports = ProductController;
