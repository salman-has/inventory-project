import { useState } from "react";
import "./filterProducts.css";

export default function ProductFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    category: "",
    id: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    const reset = { category: "", id: "" };
    setFilters(reset);
    onFilter(reset);
  };

  return (
    <div className="pf-container">
      <h2>🔍 Filter</h2>

      <label htmlFor="categoty">Category</label>
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="pf-input"
      >
        <option value="">All Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Grocery">Grocery</option>
        <option value="footwear">Footwear</option>
      </select>
      {/* <h2 style={{color:"darkgray", textAlign:"center"}}>Or</h2> */}
      <label htmlFor="id">Product ID</label>
      <input
        type="number"
        name="id"
        value={filters.id}
        onChange={handleChange}
        className="pf-input"
        placeholder="Enter ID"
      />

      <button className="pf-btn" onClick={handleFilter}>
        Apply
      </button>

      <button className="pf-btn reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
