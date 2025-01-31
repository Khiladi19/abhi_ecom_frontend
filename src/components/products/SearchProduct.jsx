import React, { useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";


function SearchProduct() {
  const { products } = useContext(AppContext);
  const [searchProduct, setSerProduct] = useState([]);
  const {term} = useParams()


  useEffect(() => {
    setSerProduct(
      products.filter(
        (data) => data?.title?.toLowerCase().includes(term.toLowerCase())
      )
    );

  }, [term, products]);
  return (
    <>
      <div className="container text-center my-10px">
        {/* <h2>Search Product</h2> */}
        <div className="row d-flex justify-content-center align-items-center">
          {searchProduct?.map((product) => (
            <div
              key={product._id}
              className="container my-5 col-md-4  d-flex justify-content-center align-items-center"
            >
              <div
                className="card bg-dark text-light text-center "
                style={{ width: "18rem" }}
              >
                <Link
                  to={`/product/${product._id}`}
                  className="d-flex justify-content-center align-items-center p-4"
                >
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
                    <button className="btn btn-warning ">AddToCart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );   
}

export default SearchProduct;
