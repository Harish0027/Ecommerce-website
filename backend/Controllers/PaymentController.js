const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

const PaymentController = {
  proceedPayment: async (req, res) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
          company: "Ecommerce",
        },
      });
      res
        .status(200)
        .json({ success: true, client_secrete: myPayment.client_secret });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Payment failed!!" });
    }
  },
  sendStripeSecreteKay: async (req, res) => {
    try {
        console.log("key"+process.env.STRIPE_API_KEY)
        res.status(200).json({stripeKey:process.env.STRIPE_API_KEY});
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "internal error!!" });
    }
  },
};

module.exports = PaymentController;
