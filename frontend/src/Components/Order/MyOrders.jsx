import React, { useEffect } from "react";
import "./MyOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../Actions/OrderAction";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders = [], error } = useSelector((state) => state.myOrders); 
  const { currentLoginUser } = useSelector((state) => state.currentLoggedUser);

  useEffect(() => {
    if (currentLoginUser) {
      dispatch(myOrders());
    }
  }, [dispatch, currentLoginUser]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="myOrdersContainer">
      <h2>My Orders</h2>

      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order) => (
          <div className="orderCard" key={order._id}>
            <div className="orderHeader">
              <span><strong>Order ID:</strong> {order._id}</span>
              <span><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</span>
              <span><strong>Status:</strong> {order.orderStatus}</span>
              <span><strong>Total:</strong> ₹{order.totalPrice}</span>
              <span><strong>Payment:</strong> {order.paymentInfo?.status}</span>
            </div>

            <div className="itemsContainer">
              {order.orderItems.map((item, index) => (
                <div className="itemRow" key={index}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p>
                      {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link to={`/order/${order._id}`} className="viewBtn">
              View Details
            </Link>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders
