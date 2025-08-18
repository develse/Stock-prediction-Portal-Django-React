import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";

// Define the shared navbar
const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="logo">
      📈 Stock Prediction Portal
    </Link>
    <div className="nav-buttons">
      <Link to="/login">
        <button className="nav-btn">Login</button>
      </Link>
      <Link to="/register">
        <button className="nav-btn register">Register</button>
      </Link>
    </div>
    <br></br>
  </nav>
);

// Define the Home page
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
          <br></br>
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
        {/* Always visible Navbar */}
        <Navbar />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* You can add more pages like <Route path="/login" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
