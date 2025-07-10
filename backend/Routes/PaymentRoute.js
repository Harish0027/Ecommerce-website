const express=require("express");
const UserAuthenticated = require("../Middlewares/UserAuthenticated");
const PaymentController = require("../Controllers/PaymentController");

const PaymentRouter=express.Router();

PaymentRouter.post('/process',UserAuthenticated,PaymentController.proceedPayment);
PaymentRouter.get("/getKey",UserAuthenticated,PaymentController.sendStripeSecreteKay);

module.exports=PaymentRouter