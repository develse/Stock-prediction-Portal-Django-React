import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StockCarousel.css";

const API_KEY = "d2iet21r01qgfkrm1cg0d2iet21r01qgfkrm1cgg"; // Replace with env variable in prod

const StockCarousel = ({ onSelectTicker }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

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

        setStocks(profiles);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading stocks...</p>;
  }

  return (
    <div className="carousel-container">
      {/* <h2 className="carousel-title">Popular Stocks:</h2> */}

      <div className="carousel">
        {stocks.map((stock, idx) => (
          <div
            key={idx}
            className="carousel-item"
            onClick={() => onSelectTicker(stock.symbol)}
            title={stock.name}
          >
            {stock.logo ? (
              <img
                src={stock.logo}
                alt={`${stock.symbol} logo`}
                className="carousel-logo"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="carousel-placeholder" />
            )}

            <div className="symbol">{stock.symbol}</div>
            <div className="name">{stock.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockCarousel;
