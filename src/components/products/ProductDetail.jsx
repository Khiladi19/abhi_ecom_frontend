import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
function ProductDetail() {
  const {removeCart, addToCart } = useContext(AppContext)
  const [product, setProduct] = useState([]);
  console.log("product",product)
  const { id } = useParams();
  const url = "http://localhost:2000/api";

  useEffect(() => {
    const fetechProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Apllication/json",
        },
        withCredentials: true,
      });

      console.log("Api", api.data);
      setProduct(api.data.product);
    };

    fetechProduct();
  }, [id]);

  return (
    <>
      <div
        className="container my-5 text-center "
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="left ">
          <img
            src={product?.imgSrc}
            alt=""
            style={{
              with: "250px",
              height: "250px",
              borderRadius: "10px",
              border: "2px solid yellow",
            }}
          />
        </div>
        <div className="right text-center">
          
            <h1>{product?.title}</h1>
            <p>{product?.description}</p>
            <h2>
              {product?.price}
              {""}
              {"₹"}
            </h2>
            <p>{product.catagory}</p>
            <div className="my-4">
              <button
               className="btn btn-danger mx-3"
                style={{ fontSize: "bold" }}
                onClick={()=>addToCart(product._id, product.title, product.price,1, product.imgSrc)}
              >
                Buy Now
              </button>
              <button className="btn btn-warning " style={{ fontSize: "bold" }} onClick={()=>removeCart(product._id)}>
                Remove 
              </button>
            </div>
        </div>
      </div>
      <RelatedProduct catagory={product.catagory}/>
    </>
  );
}

export default ProductDetail;
