import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register } = useContext(AppContext);
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when user starts typing
  };

  const { name, email, password } = formData;

  // Function to validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true); // Show loading spinner

    try {
      const result = await register(name, email, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message || "Registration failed. Try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <>
      <div
        className="container my-5"
        style={{
          width: "500px",
          height: "480px",
          border: "2px solid blue",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h2 className="text-center my-3">User Register</h2>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
              type="text"
              className="form-control"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChangeHandler}
              className="form-control"
              placeholder="Enter your password"
            />
          </div>
          <div className="d-grid col-6 my-3 mx-auto">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <span>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  &nbsp; Registering...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;

