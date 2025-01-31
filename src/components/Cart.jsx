import React, { useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
function Cart() {
  const { cart, decreaseQty, removeCart, addToCart, clearCart } =
    useContext(AppContext);
  console.log("cart", cart.items);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
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
  return (
    <>
    {/* continue shoping */}
      {cart?.items?.length == 0 && (
        <>
          <div className="container my-5 text-center">
            <Link to={`/`} className=" btn btn-primary" style={{fontWeight:"bold"}}>
              Continue Shoping--
            </Link>
          </div>
        </>
      )}
      {/* total qty or price show */}
      {cart?.items?.length > 0 && (
        <>
          <div className="my-5 text-center">
            <div
              className="btn btn-info mx-3"
              style={{ fontWeight: "bold", fontSize: "1" }}
            >
              Total Qty :-{qty}{" "}
            </div>
            <div
              className="btn btn-warning"
              style={{ fontWeight: "bold", fontSize: "1" }}
            >
              Total Price :-{price} {"₹"}
            </div>
          </div>
        </>
      )}
      {/* map cart items */}
      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container bg-dark my-5 p-3 text-center"
          style={{ borderRadius: "10px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px solid yellow",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="cart_des">
              <h2>{product?.title}</h2>
              <h4>
                {" "}
                <span>Price :-</span>
                {product?.price} {"₹"}
              </h4>
              <h4>Qty :- {product?.qty}</h4>
            </div>
            <div className="cart_btn">
              {/* button increase qty++ */}
              <div
                className="btn btn-warning mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product?.title,
                    product?.price / product?.qty,
                    1,
                    product?.imgSrc
                  )
                }
              >
                increase qty++
              </div>
              {/* decrease qty */}
              <div
                className="btn btn-danger  mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => decreaseQty(product?.productId, 1)}
              >
                decrease qty--
              </div>
              <div
                className="btn btn-info mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  if (confirm("Are you sure, want remove from cart")) {
                    removeCart(product?.productId);
                  }
                }}
              >
                remove
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* show button only  */}
      {cart?.items?.length > 0 && (
        <>
          <div className="container my-5 text-center">
            <Link to={`/shipping`} className="btn btn-info mx-3">
              Checkout
            </Link>
            <div className="btn btn-danger mx-3" onClick={clearCart}>
              Clear Cart
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
