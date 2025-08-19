import React, { useState, useEffect } from "react";
import "./components/Dashboard.css"; // ✅ fixed path
import StockCarousel from "./components/StockCarousel"; // ✅ will use its own CSS

import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";

const Navbar = ({
  isLoggedIn,
  onLogoutClick,
  showLogoutConfirm,
  onConfirmLogout,
  onCancelLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          📈 Stock Prediction Portal
        </Link>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <div className={`nav-buttons ${menuOpen ? "open" : ""}`}>
          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="nav-btn">
                  <b>Login</b>
                </button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <button className="nav-btn register">
                  <b>Register</b>
                </button>
              </Link>
            </>
          ) : (
            <div className="logout-wrapper">
              <button className="nav-btn logout" onClick={onLogoutClick}>
                Logout
              </button>
              {showLogoutConfirm && (
                <div className="logout-confirm-dropdown">
                  <p>Are you sure?</p>
                  <div className="dropdown-buttons">
                    <button className="confirm-btn" onClick={onConfirmLogout}>
                      Yes
                    </button>
                    <button className="cancel-btn" onClick={onCancelLogout}>
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="footer">
    <hr className="footer-divider" />
    <p>
      &copy; {new Date().getFullYear()} Stock Prediction Portal. All rights
      reserved.
    </p>
  </footer>
);

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "📊",
      title: "AI-Powered Analysis",
      description:
        "Advanced algorithms analyze market data to identify trends.",
    },
    {
      icon: "⚡",
      title: "Real-Time Predictions",
      description: "Get instant alerts based on live market indicators.",
    },
    {
      icon: "🛡️",
      title: "Risk Management",
      description: "Tools to help you make safer investment decisions.",
    },
  ];

  const handleSelectTicker = (symbol) => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      alert(`Please login to view prediction for ${symbol}`);
    }
  };

  return (
    <div>
      <section className="hero">
        <h1>
          Advanced Stock Market <span className="highlight">Predictions</span>
        </h1>
        <p>
          Use AI and machine learning to make informed investment decisions.
        </p>
        {isLoggedIn && (
          <button
            className="go-to-dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            <b>Dashboard</b>
          </button>
        )}
      </section>

      {/* ✅ StockCarousel */}
      <StockCarousel onSelectTicker={handleSelectTicker} />

      <div className="features">
        {features.map((feature, idx) => (
          <div key={idx} className="feature-card">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => setIsLoggedIn(true);

  const confirmLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setShowLogoutPopup(false);
    navigate("/");
  };

  const cancelLogout = () => setShowLogoutPopup(false);
  const handleLogoutClick = () => setShowLogoutPopup(true);

  return (
    <div className="App">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogoutClick={handleLogoutClick}
        showLogoutConfirm={showLogoutPopup}
        onConfirmLogout={confirmLogout}
        onCancelLogout={cancelLogout}
      />

      <div className="content">
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard isLoggedIn={isLoggedIn} />}
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
