import { useNavigate } from "react-router-dom";
import "./salesProduct.css";
import { useEffect, useState } from "react";

export default function SalesProduct() {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);

  // products load
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const navigate = useNavigate();
  return (
    <div className="sales-container">
         <h2>🛒 Sales Product</h2>
    <div className="grid">
      {products.map((p) => (
        <div
          className="card"
          key={p.id}
          onClick={() => navigate(`/products/${p.id}`)}
        >
          <img
            src="https://via.placeholder.com/150"
            alt={p.name}
            className="card-img"
          />

          <h3>{p.name}</h3>
          <p className="price">₹{p.price}</p>
        </div>
      ))}
    </div>
    </div>
  );
}
