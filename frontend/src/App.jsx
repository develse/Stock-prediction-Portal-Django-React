import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Register from "./components/register";
import Login from "./components/login";

// Navbar Component
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
        <Link to="/" className="logo">
          📈 Stock Prediction Portal
        </Link>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <div className={`nav-buttons ${menuOpen ? "open" : ""}`}>
          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="nav-btn">Login</button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <button className="nav-btn register">Register</button>
              </Link>
            </>
          ) : (
            <div className="logout-wrapper">
              <button className="nav-btn logout" onClick={onLogoutClick}>
                Logout
              </button>
              <AnimatePresence>
                {showLogoutConfirm && (
                  <motion.div
                    className="logout-confirm-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p>Are you sure?</p>
                    <div className="dropdown-buttons">
                      <button className="confirm-btn" onClick={onConfirmLogout}>
                        Yes
                      </button>
                      <button className="cancel-btn" onClick={onCancelLogout}>
                        No
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Simple Page Wrapper for transitions
const PageWrapper = ({ children }) => {
  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Home Component
const Home = () => {
  const features = [
    {
      icon: "📊",
      title: "AI‑Powered Analysis",
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

  return (
    <PageWrapper>
      <section className="hero">
        <h1>
          Advanced Stock Market <span className="highlight">Predictions</span>
        </h1>
        <p>
          Use AI and machine learning to make informed investment decisions.
        </p>
      </section>
      <div className="features">
        {features.map((feature, idx) => (
          <div key={idx} className="feature-card">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

// Main App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) setIsLoggedIn(true);
  }, []);

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const confirmLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setShowLogoutPopup(false);
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
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <PageWrapper>
                <Register />
              </PageWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login onLoginSuccess={handleLoginSuccess} />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
