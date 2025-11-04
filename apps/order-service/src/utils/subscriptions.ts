import { consumer } from "./kafka";
import { createOrder } from "./order";

export const runKafkaSubscriptions = async () => {
  consumer.subscribe([
    {
      topicName: "payment.successful",
      topicHandler: async (message) => {
        const order = message.value;
        console.log(
          "Payment successful ----------------------------------------------------------------"
        );

        try {
          await createOrder(order);
          console.log("✅ Order created successfully for:", order);
        } catch (error) {
          console.error("❌ Failed to create order:", error);
        }
      },
    },
  ]);
};
