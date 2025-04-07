import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    setFilterData,
    products,
    logout,
    isAuthenticated,
    cart,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/product/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  const filterByCategory = (category) => {
    setFilterData(
      products.filter(
        (product) => product.catagory.toLowerCase() === category.toLowerCase()
      )
    );
  };

  const filterByPrice = (price) => {
    setFilterData(products.filter((product) => product.price >= price));
  };

  const categories = ["Mobiles", "Laptops", "Shirt", "Headphone"];
  const prices = [15999, 25999, 40999, 50999, 11999];

  return (
    <div className="nav sticky-top">
      <div className="nav_bar d-flex justify-content-between align-items-center px-3 py-2 bg-dark text-white">
        <Link to="/" className="left text-decoration-none text-white">
          <h3>abhi_ecom</h3>
        </Link>

        <form className="search_bar d-flex align-items-center" onSubmit={handleSearch}>
          <span className="material-symbols-outlined me-1">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search product"
            className="form-control"
          />
        </form>

        <div className="right d-flex align-items-center">
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="btn btn-warning position-relative mx-2">
                <span className="material-symbols-outlined">shopping_cart</span>
                {cart?.items?.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.items.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
              </Link>

              <Link to="/profile" className="btn btn-warning mx-2">Profile</Link>
              <Link to="/order-conformation" className="btn btn-warning mx-2">Orders</Link>
              <button
                className="btn btn-warning mx-2"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="btn btn-info mx-2">Register</Link>
              <Link to="/login" className="btn btn-warning mx-2">Login</Link>
            </>
          )}
        </div>
      </div>

      {location.pathname === "/" && (
        <div className="sub_bar d-flex flex-wrap justify-content-center bg-light py-2">
          <div className="items mx-2 cursor-pointer" onClick={() => setFilterData(products)}>
            No Filter
          </div>
          {categories.map((cat) => (
            <div
              key={cat}
              className="items mx-2 cursor-pointer"
              onClick={() => filterByCategory(cat)}
            >
              {cat}
            </div>
          ))}
          {prices.map((price) => (
            <div
              key={price}
              className="items mx-2 cursor-pointer"
              onClick={() => filterByPrice(price)}
            >
              {price}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;

