import React, { useState } from "react";
import "./register.css";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // message text
  const [status, setStatus] = useState(null); // "success" or "error"

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
        "http://127.0.0.1:8000/api/v1/register/",
        formData
      );
      console.log("response.data ==>", response.data);
      setStatus("success");
      setMessage("🎉 Registration successful!");
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      setStatus("error");
      setMessage("❌ Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-1">
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
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Loading Spinner */}
        {loading && <div className="loader">Loading...</div>}

        {/* Success or Error Popup */}
        {message && <div className={`popup ${status}`}>{message}</div>}
      </form>
    </div>
  );
}

export default Register;
