import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import { useContext } from "react";
function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { setFilterData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  let location = useLocation();
  // navigate
  let navigate = useNavigate();
  // search product
  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/product/search/${searchTerm}`);
      setSearchTerm("");
    }
  };
  // filter productBy catagory
  const filterByCatagorey = (cat) => {
    setFilterData(
      products.filter(
        (data) => data.catagory.toLowerCase() == cat.toLowerCase()
      )
    );
  };
  // filter By Price
  const filterByPrice = (price) => {
    setFilterData(products.filter((data) => data.price >= price));
  };

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>abhi_ecom</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span
              className="material-symbols-outlined "
              style={{ marginTop: "4px" }}
            >
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="seach product"
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                {/* shoping cart */}

                <Link
                  to={`/cart`}
                  className="btn btn-warning position-relative mx-3"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>

                  {cart?.items?.length > 0 && (
                    <>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cart?.items?.length}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </>
                  )}
                </Link>
                {/* profile */}
                <Link to={`/profile`} className="btn btn-warning mx-3">
                  profile
                </Link>
                <Link to={`/order-conformation`} className="btn btn-warning mx-3">
                  Order
                </Link>

                {/* logout */}
                <button
                  className="btn btn-warning mx-3"
                  onClick={() => {
                    logout();
                    navigate(`/`);
                  }}
                >
                  logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link to={`/register`} className="btn btn-info mx-3">
                  register
                </Link>
                <Link to={`/login`} className="btn btn-warning mx-3">
                  login
                </Link>
              </>
            )}
          </div>
        </div>


        
        {location.pathname == "/" && (
          <div className="sub_bar ">
            <div className="items" onClick={() => setFilterData(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterByCatagorey("mobiles")}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterByCatagorey("laptops")}>
              Laptops
            </div>
            <div className="items" onClick={() => filterByCatagorey("shirt")}>
              Men's
            </div>
            <div
              className="items"
              onClick={() => filterByCatagorey("headphone")}
            >
              Headhphones
            </div>
            <div className="items" onClick={() => filterByPrice(15999)}>
              15999
            </div>
            <div className="items" onClick={() => filterByPrice(25999)}>
              25999
            </div>
            <div className="items" onClick={() => filterByPrice(40999)}>
              49999
            </div>
            <div className="items" onClick={() => filterByPrice(50999)}>
              25999
            </div>
            <div className="items" onClick={() => filterByPrice(11999)}>
              35999
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
