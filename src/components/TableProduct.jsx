import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
function TableProduct({ cart }) {
  const { decreaseQty, removeCart, addToCart, clearCart} =
    useContext(AppContext);
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
      <table className="table table-dark table-bordered border-primary text-center">
        <thead>
          <tr>
            <th scope="col">Product Img</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Qty ++</th>
            <th scope="col">Qty --</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
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
              <td
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
                <span className="material-symbols-outlined">add_circle</span>
              </td>
              <td onClick={() => decreaseQty(product?.productId, 1)}>
                <span className="material-symbols-outlined">
                  do_not_disturb_on
                </span>
              </td>
              <td
                onClick={() => {
                  if (confirm("Are you sure, want remove from order")) {
                    removeCart(product?.productId);
                  }
                }}
              >
                <span className="material-symbols-outlined">delete</span>
              </td>
            </tr>
          ))}

          <tr>
            <th scope="row"></th>
            <td>
              <button
                className=" btn btn-primary"
                style={{ fontWeight: "bold" }}
              >
                Total
              </button>
            </td>
            <td>
              <button
                className=" btn btn-warning"
                style={{ fontWeight: "bold" }}
              >
                {price}
              </button>
            </td>
            <td>
              <button className=" btn btn-info" style={{ fontWeight: "bold" }}>
                {qty}
              </button>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default TableProduct;
