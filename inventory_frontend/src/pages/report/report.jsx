import { useEffect, useState } from "react";
import "./report.css";

export default function Report() {
  const [data, setData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
  });

  // default load
  useEffect(() => {
    fetchData();
  }, []);

  // fetch function
  const fetchData = async (customFilters = filters) => {
    try {
      let baseUrl = "http://localhost:5000/products/report/sales";
      let topUrl = "http://localhost:5000/products/report/top-sale-products";

      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(customFilters).filter(([_, v]) => v)),
      ).toString();

      if (query) {
        baseUrl += `?${query}`;
        topUrl += `?${query}`;
      }

      const [res1, res2] = await Promise.all([fetch(baseUrl), fetch(topUrl)]);

      const data1 = await res1.json();
      const data2 = await res2.json();

      setData(data1);
      setTopProducts(data2);
    } catch (err) {
      console.log(err);
    }
  };

  //  input change
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  //  apply filter
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  //  reset
  const handleReset = () => {
    const resetFilters = {
      startDate: "",
      endDate: "",
      category: "",
    };

    setFilters(resetFilters);
    fetchData(resetFilters);
  };

  return (
    <div className="rp-container">
      <h2 className="rp-title">📊 Sales Report</h2>

      {/* Filter */}
      <form onSubmit={handleSubmit} className="rp-form">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="rp-input"
        />

        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="rp-input"
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="rp-select"
        >
          <option value="">All Category</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Grocery">Grocery</option>
          <option value="footwear">Footwear</option>
        </select>

        <button type="submit" className="rp-btn filter">
          Filter
        </button>

        <button type="button" onClick={handleReset} className="rp-btn reset">
          Reset
        </button>
      </form>

      {/* Top 5 */}
      <h3 className="rp-subtitle">Top 5 Products</h3>

      <div className="rp-top-grid">
        {topProducts.map((item, index) => (
          <div key={index} className="rp-card">
            <h4>{item.name}</h4>
            <p>{item.category}</p>
            <p>Qty: {item.total_qty}</p>
            <p className="rp-price">₹{item.total_sales}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rp-table-wrapper">
        <table className="rp-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.category}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.total}</td>
                  <td>{item.order_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="rp-no-data">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
