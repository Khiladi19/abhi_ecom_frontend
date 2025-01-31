import React, {useEffect, useState } from "react";
function ShowOrderProduct({ items }) {
    // console.log("items",items)
//   const [qty, setQty] = useState(0);
//   const [price, setPrice] = useState(0);
//   useEffect(() => {
//     let qty = 0;
//     let price = 0;
//     if (items) {
//       for (let i = 0; i < items?.length; i++) {
//         qty += items[i].qty;
//         price += items[i].price;
//       }
//     }
//     setQty(qty);
//     setPrice(price);
//   }, [items]);

  return (
    <>
      <table className="table table-dark table-bordered border-primary text-center">
        <thead>
          <tr>
            <th scope="col">Product Img</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((product) => (
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
      </table>
    </>
  );
}

export default ShowOrderProduct;
