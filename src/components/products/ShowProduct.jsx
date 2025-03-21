import React from "react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import {Link} from "react-router-dom" 
function ShowProduct() {
  const { products,filterData,addToCart,loading} = useContext(AppContext);


  return (
    <>
      <div className="row d-flex justify-content-center align-items-center">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Fetching products...</p>
          </div>
        ) : filterData.length > 0 ? (
            filterData?.map((product) => (
            <div
              key={product._id}
              className="container my-5 col-md-3  d-flex justify-content-center align-items-center"
            >
              <div
                className="card bg-dark text-light text-center "
                style={{ width: "18rem" }}
              >
                <Link to ={`/product/${product._id}`} className="d-flex justify-content-center align-items-center p-4">
                  <img
                    src={product.imgSrc}
                    className="card-img-top"
                    alt="..."
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "10px",
                      border: "2px solid yellow",
                    }}
                  />
                </Link>
                <div className="card-body ">
                  <h5 className="card-title">{product.title}</h5>
                  <div className="my-3">
                    <button className="btn btn-primary mx-3">
                      {product.price} {"₹"}
                    </button>
                    <button className="btn btn-warning " onClick={()=>addToCart(product._id, product.title, product.price,1, product.imgSrc)}>AddToCart</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted">
            <p>No products found.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowProduct;
