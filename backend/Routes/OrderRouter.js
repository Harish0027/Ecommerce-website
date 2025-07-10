const express=require("express");
const UserAuthenticated = require("../Middlewares/UserAuthenticated");
const OrderController = require("../Controllers/OrderController");
const AuthoriseRole = require("../Middlewares/AuthoriseRole");

const OrderRouter=express.Router();

OrderRouter.post('/placeOrder',UserAuthenticated,OrderController.createOrder);
OrderRouter.get('/getOrder/:id',UserAuthenticated,OrderController.getOrder);

//user
OrderRouter.get('/myOrders',UserAuthenticated,OrderController.getMyOrders);

//admin
OrderRouter.get('/admin/getOrders',UserAuthenticated,AuthoriseRole("admin"),OrderController.getOrders);
OrderRouter.put('/admin/updateOrder/:id',UserAuthenticated,AuthoriseRole("admin"),OrderController.updateOrder);
OrderRouter.put('/admin/deleteOrder/:id',UserAuthenticated,AuthoriseRole("admin"),OrderController.deleteOrder);
module.exports=OrderRouter;
