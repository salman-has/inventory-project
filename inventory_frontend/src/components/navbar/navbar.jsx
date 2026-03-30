import { Link } from "react-router-dom";
import "./navbar.css";
export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="logo">Inventory Systems</h1>

      <div className="navbar-links">
        <Link to="/" className="link">Dashboard</Link>
        <Link to="/product_page" className="link">Products</Link>
        <Link to="/sales" className="link">Sales</Link>
        {/* <Link to="/salesProduct" className="link">Sales</Link> */}
        <Link to="/report" className="link">Reports</Link>
      </div>
    </div>
  );
}

