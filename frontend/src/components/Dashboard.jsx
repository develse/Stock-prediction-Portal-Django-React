import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockList, setStockList] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);

  const API_KEY = "d2iet21r01qgfkrm1cg0d2iet21r01qgfkrm1cgg";

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await axios.get(
          `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`
        );
        const symbols = Array.isArray(res.data) ? res.data.slice(0, 50) : [];

        const profiles = await Promise.all(
          symbols.map(async (stock) => {
            try {
              const profileRes = await axios.get(
                `https://finnhub.io/api/v1/stock/profile2?symbol=${stock.symbol}&token=${API_KEY}`
              );
              return {
                symbol: stock.symbol,
                name: profileRes.data.name || stock.description || stock.symbol,
                logo: profileRes.data.logo || null,
              };
            } catch {
              return {
                symbol: stock.symbol,
                name: stock.description || stock.symbol,
                logo: null,
              };
            }
          })
        );

        setStockList(profiles);
      } catch (e) {
        console.error("Error fetching stocks:", e);
      }
    };

    fetchStocks();
  }, []);

  const handlePrediction = async () => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_API}/predict/`,
        { ticker }
      );
      setPrediction(res.data);
    } catch (e) {
      setError(e.response?.data?.detail || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => setDisplayCount((c) => c + 10);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const carouselItems = stockList.slice(0, displayCount);

  return (
    <div className={`dashboard-wrapper ${isModalOpen ? "blurred" : ""}`}>
      <div className="dashboard-body">
        <div className="ticker-bar-carousel">
          <span className="ticker-label">Popular Stocks:</span>

          <div className="ticker-carousel-wrapper">
            <div className="ticker-carousel">
              {[...carouselItems, ...carouselItems].map(
                ({ symbol, logo, name }, index) => (
                  <button
                    key={`${symbol}-${index}`}
                    className="ticker-item"
                    title={name}
                    onClick={() => setTicker(symbol)}
                    type="button"
                  >
                    {logo ? (
                      <img
                        src={logo}
                        alt={`${symbol} logo`}
                        className="ticker-logo"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="ticker-placeholder" />
                    )}
                    <div className="ticker-info">
                      <strong>{symbol}</strong>
                      <small>{name}</small>
                    </div>
                  </button>
                )
              )}
            </div>
          </div>

          {displayCount < stockList.length && (
            <button className="load-more-btn" onClick={loadMore} type="button">
              Load More
            </button>
          )}
        </div>

        <div className="form-panel">
          <input
            type="text"
            placeholder="Enter Ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            disabled={loading}
            className="ticker-input"
          />
          <button
            onClick={handlePrediction}
            disabled={loading || !ticker.trim()}
            className="prediction-btn"
            type="button"
          >
            {loading ? (
              <>
                Loading
                <span className="spinner" />
              </>
            ) : (
              "See Prediction"
            )}
          </button>
        </div>

        {error && (
          <div className="error-message" role="alert">
            ⚠️ {error}
          </div>
        )}

        {prediction && (
          <section className="prediction-result">
            <h3>Prediction Result</h3>
            {prediction.error ? (
              <div className="prediction-error">
                <p>
                  <strong>Error:</strong> {prediction.error}
                </p>
                <divider></divider>
                <p>
                  <strong>Status:</strong> {prediction.status}
                </p>
              </div>
            ) : (
              <>
                <p></p>

                {[
                  "plot_img",
                  "plot_100_dma",
                  "plot_200_dma",
                  "plot_prediction",
                ].map((key) =>
                  prediction[key] ? (
                    <div key={key} className="image-section">
                      <h4>
                        {key === "plot_img" && "Closing Price"}
                        {key === "plot_100_dma" && "100-Day Moving Average"}
                        {key === "plot_200_dma" && "200-Day Moving Average"}
                        {key === "plot_prediction" &&
                          "Predicted vs Actual Price"}
                      </h4>
                      <img
                        src={`${import.meta.env.VITE_BACKEND_ROOT}${
                          prediction[key]
                        }`}
                        alt={key}
                        className="prediction-image"
                        onClick={openModal}
                      />
                    </div>
                  ) : null
                )}

                <div className="metrics">
                  <h4>Model Metrics</h4>
                  <p>MSE: {prediction.mse.toFixed(4)}</p>
                  <p>RMSE: {prediction.rmse.toFixed(4)}</p>
                  <p>R²: {prediction.r2.toFixed(4)}</p>
                </div>
              </>
            )}
          </section>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>

            {[
              "plot_img",
              "plot_100_dma",
              "plot_200_dma",
              "plot_prediction",
            ].map((key) =>
              prediction[key] ? (
                <div key={key} className="modal-image-section">
                  <h4>
                    {key === "plot_img" && "Closing Price"}
                    {key === "plot_100_dma" && "100-Day Moving Average"}
                    {key === "plot_200_dma" && "200-Day Moving Average"}
                    {key === "plot_prediction" && "Predicted vs Actual"}
                  </h4>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_ROOT}${
                      prediction[key]
                    }`}
                    alt={`Zoomed ${key}`}
                    className="modal-image"
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
