import React from "react";
import "./App.css";

function App() {
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
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">📈 Stock Prediction Portal</div>
        <div className="nav-buttons">
          <button className="nav-btn">Login</button>
          <button className="nav-btn register">Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>
          Advanced Stock Market <span className="highlight">Predictions</span>
        </h1>
        <p>
          Harness the power of artificial intelligence and machine learning to
          make informed investment decisions. Our cutting-edge algorithms
          analyze market trends, historical data, and real-time indicators to
          provide accurate stock predictions and portfolio optimization.
        </p>
        <div className="hero-buttons">
          {/* <button className="get-started">Get Started Free</button>
          <button className="learn-more">Learn More</button> */}
        </div>
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
    </div>
  );
}

export default App;
