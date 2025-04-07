import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";
import ShowOrderProduct from "./ShowOrderProduct";

function OrderConfirmation() {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    if (userOrder?.length > 0) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);

  if (!userOrder || userOrder.length === 0 || !latestOrder) {
    return (
      <div className="container text-center my-5">
        <h2>You haven't placed any orders yet.</h2>
        <Link to="/" className="btn btn-primary mt-3">Go to Home</Link>
      </div>
    );
  }

  return (
    <>
      <div className="container my-5 text-center">
        <h1>Your order has been confirmed</h1>
        <h2>It will be delivered soon</h2>
      </div>

      <div className="container">
        <table className="table table-dark table-bordered border-primary my-2">
          <thead>
            <tr className="text-center">
              <th>Ordered Products</th>
              <th>Order Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ShowOrderProduct items={latestOrder.orderItems} />
              </td>
              <td>
                <ul className="fw-bold list-unstyled">
                  <li><strong>Order ID:</strong> {latestOrder.orderId}</li>
                  <li><strong>Payment ID:</strong> {latestOrder.paymentId}</li>
                  <li><strong>Payment Status:</strong> {latestOrder.payStatus}</li>
                  <li><strong>Amount:</strong> ₹{latestOrder.amount}</li>
                  <li><strong>Order Date:</strong> {latestOrder.orderDate}</li>
                  <li><strong>Name:</strong> {latestOrder.userShipping?.fullName}</li>
                  <li><strong>Phone:</strong> {latestOrder.userShipping?.phoneNumber}</li>
                  <li><strong>Country:</strong> {latestOrder.userShipping?.country}</li>
                  <li><strong>State:</strong> {latestOrder.userShipping?.state}</li>
                  <li><strong>City:</strong> {latestOrder.userShipping?.city}</li>
                  <li><strong>Pincode:</strong> {latestOrder.userShipping?.pincode}</li>
                  <li><strong>Address:</strong> {latestOrder.userShipping?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container text-center my-3 p-2">
        <Link to="/" className="btn btn-primary">Home</Link>
      </div>
    </>
  );
}

export default OrderConfirmation;
