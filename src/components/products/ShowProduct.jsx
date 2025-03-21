import React from "react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import {Link} from "react-router-dom" 
function ShowProduct() {
  const { products,filterData,addToCart,loading} = useContext(AppContext);


  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Fetching products...</p>
          </div>
        ) : filterData.length > 0 ? (
          filterData.map((product) => (
            <div key={product._id} className="col-md-4 col-lg-3 mb-4">
              <div className="card bg-dark text-light text-center shadow-lg">
                <img
                  src={product.imgSrc}
                  className="card-img-top rounded"
                  alt={product.title}
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "10px",
                    border: "2px solid yellow",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <div className="my-3 d-flex justify-content-center gap-2">
                    <button className="btn btn-primary">{product.price} ₹</button>
                    <button className="btn btn-warning">Add to Cart</button>
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
    </div>
  );
}

export default ShowProduct;
