import React, { useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import {useNavigate} from "react-router-dom";
import TableProduct from "./TableProduct";
import axios from "axios";

function Checkout() {
  const { cart, userAddress, url, user,clearCart } = useContext(AppContext);
  console.log("userAddress",userAddress)
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setQty(qty);
    setPrice(price);
  }, [cart]);



  // handlepaymet
  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(`${url}/payment/create-order`, {
        amount: price,
        qty:qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });
      // console.log("orderResponse", orderResponse.data);
      const {amount,orderId,userShipping} = orderResponse.data

      const options = {
        key: "rzp_test_cIzGMKNJEco16I",
        amount: amount, 
        currency: "INR",
        name: "abhi_ecom",
        description: "Test Transaction",
        order_id: orderId,
        "handler":  async function (response){
          const paymentData = {
            orderId : response.razorpay_order_id,
            paymentId : response.razorpay_payment_id,
            signature  : response.razorpay_signature,
            amount : price,
            orderItems: cart?.items,
            userId:user._id,
            userShipping:userAddress
          }

          const api =  await axios.post(`${url}/payment/verify-payment`,
            paymentData
          )

          // console.log("api",api.data)

          if(api?.data?.sucess){
            navigate('/order-conformation')
            clearCart()
          }
          
      },
        callback_url: "http://localhost:3000/payment-success", // Your success URL
        prefill: userShipping,
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log("Error fectchin in handlePayment ", error);
    }
  };

  return (
    <>
      <div className="container my-4">
        <h2 className="text-center" style={{ fontWeight: "bold" }}>
          Order Summary
        </h2>
        <table className="table table-dark table-bordered border-primary my-4">
          <thead>
            <tr className="text-center">
              <th scope="col">Product Details</th>
              <th scope="col">Shipping Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {/* prduct detail */}
                <TableProduct cart={cart} />
              </td>
              {/* Shipping Address*/}
              <td>
                <ul style={{ fontWeight: "bold" }}>
                  <li>Name :- {userAddress.fullName}</li>
                  <li>Phone No :- {userAddress.phoneNumber}</li>
                  <li>Country :- {userAddress.country}</li>
                  <li>State :- {userAddress.state}</li>
                  <li>City :- {userAddress.city}</li>
                  <li>Pincode :- {userAddress.pincode}</li>
                  <li>Address :- {userAddress.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5">
        <bttton
          onClick={handlePayment}
          className="btn btn-primary btn-lg"
          style={{ fontWeight: "bold" }}
        >
          Payment
        </bttton>
      </div>
    </>
  );
}

export default Checkout;
