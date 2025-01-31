import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [inputs, setInputs] = useState({});
  const { login } = useContext(AppContext);
  const navigte = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const { email, password } = inputs;
  const handleSumbit = async (e) => {
    e.preventDefault();
    // console.log("Input",inputs)
    const reslut = await login(email, password);
    if (reslut?.success) {
      navigte("/");
    }
  };
  return (
    <>
      <div
        className="container my-5"
        style={{
          width: "500px",
          height: "400px",
          border: "2px solid blue",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <h2 className="text-center my-3">User Login</h2>
        <form onSubmit={handleSumbit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="d-grid col-6 my-3 mx-auto">
            <button type="submit" className="btn btn-primary">
              sumbit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
