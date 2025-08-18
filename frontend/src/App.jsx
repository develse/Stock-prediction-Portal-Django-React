import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";

// Updated Navbar with container
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          📈 Stock Prediction Portal
        </Link>

        {/* Hamburger icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Navigation buttons */}
        <div className={`nav-buttons ${menuOpen ? "open" : ""}`}>
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <button className="nav-btn">Login</button>
          </Link>
          <Link to="/register" onClick={() => setMenuOpen(false)}>
            <button className="nav-btn register">Register</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Home Page
const Home = () => {
  const features = [
    {
      icon: "📊",
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms analyze vast amounts of market data to identify patterns and trends.",
    },
    {
      icon: "⚡",
      title: "Real-Time Predictions",
      description:
        "Get instant predictions and alerts based on live market data and breaking news analysis.",
    },
    {
      icon: "🛡️",
      title: "Risk Management",
      description:
        "Comprehensive risk assessment tools to help you make safer investment decisions.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <h1>
          <br />
          Advanced Stock Market <span className="highlight">Predictions</span>
        </h1>
        <p>
          Harness the power of artificial intelligence and machine learning to
          make informed investment decisions. Our cutting-edge algorithms
          analyze market trends, historical data, and real-time indicators to
          provide accurate stock predictions and portfolio optimization.
        </p>
      </section>

      {/* Features Section */}
      <div className="features">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
