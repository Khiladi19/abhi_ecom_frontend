import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

function Address() {
  const { addAddress ,userAddress} = useContext(AppContext);
  let navigate = useNavigate();

  const [addressData, setAddressData] = useState({
    fullName: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const {
    fullName,
    phoneNumber,
    country,
    state,
    city,
    pincode,
    address
  } = addressData;

  const sumbitHandler = async (e) => {
    e.preventDefault();
    const result = await addAddress(
      fullName,
      phoneNumber,
      country,
      state,
      city,
      pincode,
      address,
    );

    if (result?.sucess) {
      navigate("/checkout");
    }

  };

  return (
    <>
      <div
        className="container my-5 p-4"
        style={{
          border: "2px solid blue",
          borderRadius: "10px",
          // marginTop: "20px",
        }}
      >
        <h2 className="text-center my-3">Shipping Address</h2>
        <form onSubmit={sumbitHandler}>
          <div className="row">
            <div className="mb-3 col-md-4 ">
              <label htmlFor="exampleInputEmail1" className="form-label">
                FullName
              </label>
              <input
                name="fullName"
                value={addressData.fullName}
                onChange={onChangerHandler}
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="nameHelp"
              />
            </div>
            <div className="mb-3 col-md-4 ">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                name="phoneNumber"
                value={addressData.phoneNumber}
                onChange={onChangerHandler}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4 ">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={addressData.country}
                onChange={onChangerHandler}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
          </div>
          {/* ----------------- */}
          <div className="row">
            <div className="mb-3 col-md-4 ">
              <label htmlFor="exampleInputEmail1" className="form-label">
                State
              </label>
              <input
                name="state"
                value={addressData.state}
                onChange={onChangerHandler}
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="nameHelp"
              />
            </div>
            <div className="mb-3 col-md-4 ">
              <label htmlFor="exampleInputEmail1" className="form-label">
                City
              </label>
              <input
                type="text"
                name="city"
                value={addressData.city}
                onChange={onChangerHandler}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4 ">
              <label htmlFor="exampleInputPassword1" className="form-label">
                PinCode
              </label>
              <input
                type="number"
                name="pincode"
                value={addressData.pincode}
                onChange={onChangerHandler}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 ">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Address/Nearby
              </label>
              <textarea
                type="text"
                name="address"
                value={addressData.address}
                onChange={onChangerHandler}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          <div className="d-grid col-6 my-3 mx-auto">
            <button type="submit" className="btn btn-primary" style={{fontWeight:"bold"}}>
              Sumbit
            </button>
          </div>
        </form>
        {userAddress && (
           <div className="d-grid col-6 my-3 mx-auto ">
           <button className="btn btn-warning" onClick={()=> navigate('/checkout')} style={{fontWeight:"bold"}}>Use Old Address</button>
         </div>
        )}
      </div>
    </>
  );
}

export default Address;
