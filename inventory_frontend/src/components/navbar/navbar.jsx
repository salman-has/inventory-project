import { Link } from "react-router-dom";
import "./navbar.css";
export default function Navbar() {
  return (
    <div className="nav-container">
      <h1 className="nav-logo">Demo proj</h1>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          Dashboard
        </Link>
        <Link to="/product_page" className="nav-link">
          Products
        </Link>
        <Link to="/salesProduct" className="nav-link">
          Sales
        </Link>
        <Link to="/report" className="nav-link">
          Reports
        </Link>
      </div>
    </div>
  );
}
