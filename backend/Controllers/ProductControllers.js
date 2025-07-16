const ApiFeatures = require("../utils/ApiFeatures");
const ProductModel = require("../Model/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");

const ProductController = {
  getAllProducts: async (req, res, next) => { 
    try {
      const resultPerPage = 5;
      const productCount = await ProductModel.countDocuments();

      const queryFeature = new ApiFeatures(ProductModel.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

      const products = await queryFeature.query;
      
      res.status(200).json({
        success: true,
        data: products,
        count: productCount,
        resultPerPage,
        message: "All products fetched successfully",
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to fetch products", 500));
    }
  },

  addProduct: async (req, res, next) => {
    try {
      req.body.user = req.user.id;
      const newProduct = await ProductModel.create(req.body);
      res.status(201).json({
        success: true,
        data: newProduct,
        message: "Product added successfully",
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to add new product", 500));
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const product = await ProductModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      return next(new ErrorHandler("Something went wrong while updating product", 500));
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const product = await ProductModel.findByIdAndDelete(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "The product was deleted successfully!",
        data: product,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to delete product", 500));
    }
  },

  getProductById: async (req, res, next) => {
    try {
      const product = await ProductModel.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      res.status(200).json({
        success: true,
        data: product,
        message: "Product fetched successfully",
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to fetch product", 500));
    }
  },

  createProductReview: async (req, res, next) => {
    try {
      const { rating, comment, productId } = req.body;

      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };

      const product = await ProductModel.findById(productId);

      if (!product) {
        return next(new ErrorHandler("Product does not exist", 400));
      }

      const isReviewed = product.reviews.find(
        (ele) => ele.user.toString() === req.user._id.toString()
      );

      if (isReviewed) {
        product.reviews.forEach((ele) => {
          if (ele.user.toString() === req.user._id.toString()) {
            ele.rating = rating;
            ele.comment = comment;
          }
        });
      } else {
        product.reviews.push(review);
      }

      product.numberOfReviews = product.reviews.length;

      const sum = product.reviews.reduce((sum, current) => {
        return sum + current.rating;
      }, 0);

      product.rating = product.reviews.length === 0 ? 0 : parseFloat((sum / product.reviews.length).toFixed(1));

      await product.save({ validateBeforeSave: true });

      return res.status(200).json({
        success: true,
        message: "Review added successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to add review", 500));
    }
  },

  getAllReviews: async (req, res, next) => {
    try {
      const product = await ProductModel.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product does not exist", 400));
      }

      res.status(200).json({
        success: true,
        message: "Reviews fetched successfully!",
        reviews: product.reviews,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to fetch reviews", 500));
    }
  },

  deleteReviews: async (req, res, next) => {
    try {
      const product = await ProductModel.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product does not exist", 400));
      }

      const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.reviewId.toString()
      );

      const sum = reviews.reduce((sum, current) => sum + current.rating, 0);
      const avgRating = reviews.length === 0 ? 0 : parseFloat((sum / reviews.length).toFixed(1));

      await ProductModel.findByIdAndUpdate(
        req.params.id,
        {
          reviews,
          rating: avgRating,
          numberOfReviews: reviews.length,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        success: true,
        message: "Review deleted successfully!",
        reviews,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to delete review", 500));
    }
  },
};

module.exports = ProductController;
