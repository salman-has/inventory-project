import { useEffect, useState } from "react";

export default function Report() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: ""
  });

  // load default data
  useEffect(() => {
    fetchData();
  }, []);

  // fetch function
  const fetchData = async () => {
    try {
      let url = "http://localhost:5000/products/report/sales";

      const query = new URLSearchParams(filters).toString();
      if (query) {
        url += `?${query}`;
      }

      const res = await fetch(url);
      const result = await res.json();

      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  // handle input change
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // submit filter
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Sales Report</h2>

      {/* Filter Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
        />

        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          style={{ marginLeft: "10px" }}
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          style={{ marginLeft: "10px" }}
        >
          <option value="">All Category</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Grocery">Grocery</option>
          <option value="footwear">footwear</option>
        </select>

        <button type="submit" style={{ marginLeft: "10px" }}>
          Filter
        </button>
      </form>

      {/* Table */}
      <table border="1" cellPadding="10" width="100%">
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
                <td>{item.price}</td>
                <td>{item.total}</td>
                <td>{item.order_date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" align="center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}