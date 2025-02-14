import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import {useNavigate} from "react-router-dom"

function Register() {
  const { register } = useContext(AppContext);
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { name, email, password } = formData;
  
  const sumbitHandler = async (e) =>{
    e.preventDefault();
     const result = await register(name, email, password);
     if(result.success){
      navigate('/')
     }
  }

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
        <h2 className="text-center my-3">User Register</h2>
        <form onSubmit={sumbitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={onChangerHandler}
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="nameHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangerHandler}
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
              value={formData.password}
              onChange={onChangerHandler}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="d-grid col-6 my-3 mx-auto">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
