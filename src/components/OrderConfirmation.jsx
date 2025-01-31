import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";
import ShowOrderProduct from "./ShowOrderProduct";
function OrderConfirmation() {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});
  // console.log("userOrder", userOrder);

  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);

  // console.log("Latest Order", latestOrder);

  return (
    <>
      {userOrder?.length == 0 ? (
        <>
          <div className="container text-center my-5">
            <h2>You have did not any order</h2>
          </div>
          <div className="container text-center my-5">
          <Link to={`/`} className="btn btn-primary">Home</Link>
          </div>
        </>
      ) : (
        <>
          <div className="container my-5">
            <h1 className="text-center">Your order has been confirm,</h1>
            <h2 className="text-center">it will be delivered soon</h2>
          </div>
          <div className="container">
            <table className="table table-dark table-bordered border-primary my-2">
              <thead>
                <tr className="text-center">
                  <th scope="col">Order Product</th>
                  <th scope="col">Order Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {/* product order */}
                    {/* <table className="table table-dark table-bordered border-primary text-center">
                      <thead>
                        <tr>
                          <th scope="col">Product Img</th>
                          <th scope="col">Title</th>
                          <th scope="col">Price</th>
                          <th scope="col">Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {latestOrder?.orderItems?.map((product) => (
                          <tr key={product._id}>
                            <th scope="row">
                              <img
                                src={product.imgSrc}
                                alt=""
                                style={{ width: "40px", borderRadius: "5px" }}
                              />
                            </th>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table> */}
                    <ShowOrderProduct items={latestOrder?.orderItems}/>
                  </td>
                  {/* order details */}
                  <td>
                    <ul style={{ fontWeight: "bold" }}>
                      <li>OrderId :- {latestOrder?.orderId}</li>
                      <li>PaymentId :- {latestOrder?.paymentId}</li>
                      <li>PayStatus :- {latestOrder?.payStatus}</li>
                      <li>Amount :- {latestOrder?.amount} {'₹'}</li>
                      <li>OrderDate :- {latestOrder?.orderDate}</li>
                      <li>Name :- {latestOrder?.userShipping?.fullName}</li>
                      <li>
                        Phone No :- {latestOrder?.userShipping?.phoneNumber}
                      </li>
                      <li>Country :- {latestOrder?.userShipping?.country}</li>
                      <li>State :- {latestOrder?.userShipping?.state}</li>
                      <li>City :- {latestOrder?.userShipping?.city}</li>
                      <li>Pincode :- {latestOrder?.userShipping?.pincode}</li>
                      <li>Address :- {latestOrder?.userShipping?.address}</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="container text-center my-3 p-2">
            <Link to={`/`} className="btn btn-primary ">
              Home
            </Link>
          </div>
        </>
      )}
    </>


    // <>
    //   <div className="container my-5">
    //      <h1 className="text-center">Your order has been confirm,</h1>
    //      <h2 className="text-center">it will be delivered soon</h2>
    //   </div>
    //   <div className="container">
    //     <table className="table table-dark table-bordered border-primary my-2">
    //       <thead>
    //         <tr className="text-center">
    //           <th scope="col">Order Product</th>
    //            <th scope="col">Order Detail</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td>
    //           {/* product order */}
    //             <table className="table table-dark table-bordered border-primary text-center">
    //               <thead>
    //                 <tr>
    //                    <th scope="col">Product Img</th>
    //                    <th scope="col">Title</th>
    //                    <th scope="col">Price</th>
    //                    <th scope="col">Qty</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {latestOrder?.orderItems?.map((product) => (
    //                   <tr key={product._id}>
    //                     <th scope="row">
    //                       <img
    //                         src={product.imgSrc}
    //                         alt=""
    //                         style={{ width: "40px", borderRadius: "5px" }}
    //                       />
    //                     </th>
    //                     <td>{product.title}</td>
    //                     <td>{product.price}</td>
    //                     <td>{product.qty}</td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </table>
    //           </td>
    //           {/* order details */}
    //           <td>
    //             <ul style={{ fontWeight: "bold" }}>
    //               <li>OrderId :- {latestOrder?.orderId}</li>
    //               <li>PaymentId :- {latestOrder?.paymentId}</li>
    //               <li>Signture :- {latestOrder?.signature}</li>
    //               <li>PayStatus :- {latestOrder?.payStatus}</li>
    //               <li>Amount :- {latestOrder?.amount}</li>
    //               <li>OrderDate :- {latestOrder?.orderDate}</li>
    //               <li>Name :- {latestOrder?.userShipping?.fullName}</li>
    //               <li>Phone No :- {latestOrder?.userShipping?.phoneNumber}</li>
    //               <li>Country :- {latestOrder?.userShipping?.country}</li>
    //               <li>State :- {latestOrder?.userShipping?.state}</li>
    //               <li>City :- {latestOrder?.userShipping?.city}</li>
    //               <li>Pincode :- {latestOrder?.userShipping?.pincode}</li>
    //               <li>Address :- {latestOrder?.userShipping?.address}</li>
    //             </ul>
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    //   <div className="container text-center my-3 p-2">
    //     <Link to={`/`} className="btn btn-primary ">
    //       Home
    //     </Link>
    //   </div>
    // </>
  );
}

export default OrderConfirmation;
