import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ||
    ("sk_test_51PRUu3D7V6SktyDSNCqoozZkRgZVj3qyqqOw7synWRvusM9aax6Wwn1c8mIaPJXDxzqxKNLp18txcnaPzjzSoeSa00Wtw7fNGn" as string),
  {
    apiVersion: "2025-08-27.basil" as any,
  }
);

export default stripe;
