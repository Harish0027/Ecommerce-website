const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name !!!"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description !!!"],
  },
  price: {
    type: Number,
    required: [true, "Product must have Price !!!"],
    max: [99999999, "Price shouldn't exceed 8 digits"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  image:[{
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  }],
  category: {
    type: String,
    required: [true, "Please enter category for product!!!"],
  },
  stock: {
    type: Number,
    required: [true, "Available stocks for the Product should be known !!!"],
    default: 1,
    max: [9999, "Available stock shouldn't exceed 4 digits"],
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
  }
},
{
    timestamps:true
});

module.exports = mongoose.model("Product", ProductSchema);
