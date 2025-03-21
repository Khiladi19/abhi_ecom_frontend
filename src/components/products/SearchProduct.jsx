import React, { useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";


function SearchProduct() {
  const { products } = useContext(AppContext);
  // const [searchProduct, setSerProduct] = useState([]);
  const {term} = useParams()


  const searchResults = useMemo(() => {
    return products?.filter((product) =>
      product?.title?.toLowerCase().includes(term.toLowerCase())
    ) || [];
  }, [term, products]);


  return (
    <>
      <div className="container text-center my-10px">
      <h2 className="mb-4">Search Results for "{term}"</h2>
        <div className="row d-flex justify-content-center align-items-center">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div key={product?._id} className="col-md-4 my-3">
              <div className="card bg-dark text-light text-center">
                <Link to={`/product/${product?._id}`} className="p-3">
                  <img
                    src={product?.imgSrc || "/placeholder.png"}
                    className="card-img-top"
                    alt={product?.title || "Product"}
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "10px",
                      border: "2px solid yellow",
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product?.title}</h5>
                  <div className="my-3">
                    <button className="btn btn-primary mx-2">
                      {product?.price} ₹
                    </button>
                    <button className="btn btn-warning">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-muted">No products found</h4>
        )}
        </div>
      </div>
    </>
  );   
}

export default SearchProduct;
