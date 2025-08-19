import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setStatus(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/token/",
        formData
      );

      const { access, refresh } = response.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      setStatus("success");
      setMessage("✅ Login successful!");
      onLoginSuccess(); // update login state
      // DASHBAORD NEED TO BE DONE NOW!
      navigate("/dashboard"); // ✅ redirect to dashboard
    } catch (error) {
      console.error("JWT Login error:", error.response?.data || error.message);
      setStatus("error");
      setMessage("❌ Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-1">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {loading && <div className="loader">Loading...</div>}
        {message && <div className={`popup ${status}`}>{message}</div>}
      </form>
    </div>
  );
}

export default Login;
