import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../Actions/OrderAction";
import "./OrderD.css";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.orderDetail);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return (
    <div className="order-detail-container">
      <h2>Order Detail</h2>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && order && (
        <div className="order-box">

            
          {/* Delivery Tracker */}
          <section>
            <h4>Delivery Progress</h4>
            <div className="progress-bar-container">
              <div
                className={`progress-step ${
                  ["Processing", "Shipped", "Delivered"].includes(
                    order.orderStatus
                  )
                    ? "active"
                    : ""
                }`}
              >
                <div className="circle">1</div>
                <span>Processing</span>
              </div>
              <div
                className={`progress-step ${
                  ["Shipped", "Delivered"].includes(order.orderStatus)
                    ? "active"
                    : ""
                }`}
              >
                <div className="circle">2</div>
                <span>Shipped</span>
              </div>
              <div
                className={`progress-step ${
                  order.orderStatus === "Delivered" ? "active" : ""
                }`}
              >
                <div className="circle">3</div>
                <span>Delivered</span>
              </div>
              <div className="progress-line"></div>
            </div>
          </section>

          {/* Payment Info */}
          <section>
            <h4>Payment</h4>
            <p>
              <strong>Status:</strong> {order.paymentInfo?.status}
            </p>
            <p>
              <strong>Paid At:</strong>{" "}
              {order.paidAt ? new Date(order.paidAt).toLocaleString() : "N/A"}
            </p>
          </section>

          {/* Shipping Info (simplified) */}
          <section>
            <h4>Shipping Information</h4>
            <p>
              <strong>City:</strong> {order.shippingInfo?.city}
            </p>
            <p>
              <strong>Phone:</strong> {order.shippingInfo?.phoneNo}
            </p>
          </section>

          {/* Items */}
          <section>
            <h4>Items Ordered</h4>
            <ul>
              {order.orderItems?.map((item) => (
                <li key={item.product} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.price.toLocaleString("en-IN")}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Price Summary */}
          <section>
            <h4>Price Summary</h4>
            <p>
              <strong>Items:</strong> ₹
              {order.itemsPrice?.toLocaleString("en-IN")}
            </p>
            <p>
              <strong>Tax:</strong> ₹{order.taxPrice?.toLocaleString("en-IN")}
            </p>
            <p>
              <strong>Shipping:</strong> ₹
              {order.shippingPrice?.toLocaleString("en-IN")}
            </p>
            <p>
              <strong>Total:</strong> ₹
              {order.totalPrice?.toLocaleString("en-IN")}
            </p>
          </section>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
