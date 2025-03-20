
import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!inputs.email || !inputs.password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true); // Show loading while submitting

    try {
      const result = await login(inputs.email, inputs.password);
      if (result?.success) {
        navigate("/");
      } else {
        setError(result?.message || "Invalid email or password.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container my-5"
      style={{
        width: "500px",
        height: "420px",
        border: "2px solid blue",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h2 className="text-center my-3">User Login</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your password"
          />
        </div>
        <div className="d-grid col-6 my-3 mx-auto">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm"></span> Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;