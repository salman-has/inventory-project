import "./dashboard.css";
import { useState,useEffect } from "react";
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
    <div className="dashbpard-container">
      <h2>📊 Dashboard</h2>

      <div className="cards">
        <div className="card">💰 Total Sales Revanue: ₹{summary.total_revenue}</div>
        <div className="card">📦 Total Orders: {summary.total_orders}</div>
        <div className="card">🔥 Top Soled Product: {topSoledProduct ? topSoledProduct.name : "Loading..."}</div>
        <div className="card">⚠️ Low Stock:  {lowStock ? `${lowStock.name} (${lowStock.stock})` : "OK"}</div>
      </div>
    </div>
  );
}
