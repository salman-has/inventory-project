import "./dashboard.css";
import { useState, useEffect } from "react";
export default function Dashboard() {
  const [summary, setSummary] = useState({
    total_orders: 0,
    total_revenue: 0,
  });

  const [topSoledProduct, setTopSoledProduct] = useState(null);

  const [lowStock, setLowStock] = useState(null);

  useEffect(() => {
    // fetch summary report
    fetch("http://localhost:5000/products/report/summary")
      .then((res) => res.json())
      .then((data) => {
        setSummary(data);
      })
      .catch((err) => console.log(err));

    //top soled product find api
    fetch("http://localhost:5000/products/report/top-sale")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setTopSoledProduct(data[0]); // sabse top product
        }
      });

    // api route for low stock ...
    fetch("http://localhost:5000/products/report/low-stock")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setLowStock(data[0]);
        }
      });
  }, []);

  return (
    <div className="db-container">
      <h2 className="db-title">📊 Dashboard</h2>

      <div className="db-cards">
        <div className="db-card revenue">
          💰 Total Sales Revenue
          <h3>₹{summary.total_revenue}</h3>
        </div>

        <div className="db-card orders">
          📦 Total Orders
          <h3>{summary.total_orders}</h3>
        </div>

        <div className="db-card top">
          🔥 Top Sold Product
          <h3>{topSoledProduct ? topSoledProduct.name : "Loading..."}</h3>
        </div>

        <div className="db-card stock">
          ⚠️ Low Stock
          <h3>{lowStock ? `${lowStock.name} (${lowStock.stock})` : "OK"}</h3>
        </div>
      </div>
    </div>
  );
}
