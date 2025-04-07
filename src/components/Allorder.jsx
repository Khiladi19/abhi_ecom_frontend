import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import ShowOrderProduct from "./ShowOrderProduct";

function AllOrder() {
  const { userOrder } = useContext(AppContext);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">All Your Orders</h2>

      {userOrder?.length === 0 ? (
        <div className="text-center">
          <h4>You have no orders yet.</h4>
        </div>
      ) : (
        userOrder.map((order, index) => (
          <div className="card mb-4 shadow-sm" key={order.orderId || index}>
            <div className="card-header bg-primary text-white">
              <h5>Order #{order.orderId}</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {/* Order Items */}
                <div className="col-md-6">
                  <h6>Items:</h6>
                  <ShowOrderProduct items={order.orderItems} />
                </div>

                {/* Order Details */}
                <div className="col-md-6">
                  <h6>Order Details:</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Payment ID: {order.paymentId}</li>
                    <li className="list-group-item">Pay Status: {order.payStatus}</li>
                    <li className="list-group-item">Amount: ₹{order.amount}</li>
                    <li className="list-group-item">Order Date: {order.orderDate}</li>
                    <li className="list-group-item">Name: {order.userShipping?.fullName}</li>
                    <li className="list-group-item">Phone: {order.userShipping?.phoneNumber}</li>
                    <li className="list-group-item">City: {order.userShipping?.city}</li>
                    <li className="list-group-item">Address: {order.userShipping?.address}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AllOrder;
