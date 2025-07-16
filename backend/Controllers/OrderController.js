const Order = require("../Model/OrderModel");
const ErrorHandler=require("../utils/ErrorHandler")
const OrderController = {
  createOrder: async (req, res, next) => {
    try {
      const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      const order = new Order({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
      });

      await order.save();

      res.status(200).json({
        message: "Order placed successfully!!!",
        success: true,
        order,
      });
    } catch (error) {
      console.log(error)
      return next(new ErrorHandler("Failed to place order", 500));
    }
  },
  getMyOrders: async (req, res, next) => {
    try {
      console.log(req.user)
      const orders = await Order.find({ user: req.user._id });

      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        orders,
      });
    } catch (error) {
      console.log(error)
      return next(new ErrorHandler("Failed to fetch orders", 500));
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id).populate(
        "user",
        "email name"
      );

      if (!order) {
        return next(new ErrorHandler("Order not found", 400));
      }

      res.status(200).json({
        message: "Order fetched successfully!!!",
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to fetch order", 500));
    }
  },
  getOrders: async (req, res, next) => {
    try {
      const orders = await Order.find();

      if (!orders) {
        return next(new ErrorHandler("Order not found", 400));
      }

      res.status(200).json({
        message: "Order fetched successfully!!!",
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to fetch order", 500));
    }
  },

  updateOrder: async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (order.orderStatus === "Delivered") {
        return next(
          new ErrorHandler("You have already delivered this order", 400)
        );
      }

      for (const orderItem of order.orderItems) {
        await updateStock(orderItem.product, orderItem.quantity);
      }

      order.orderStatus = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to update order", 500));
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this ID", 404));
      }

      await order.deleteOne();

      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to delete order", 500));
    }
  },
};

module.exports = OrderController;
