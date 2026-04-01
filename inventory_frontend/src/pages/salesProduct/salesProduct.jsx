import { data, useNavigate } from "react-router-dom";
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
  }, [products]);

  //test function

  const navigate = useNavigate();
  return (
    <div className="sp-container">
      <h2>🛒 Sales Product</h2>

      <div className="sp-grid">
        {products.map((p) => (
          <div
            className="sp-card"
            key={p.id}
            onClick={() => navigate(`/productDetails/id/${p.id}`)}
          >
            <img
              src="https://picsum.photos/200"
              alt={p.name}
              className="sp-card-img"
            />

            <h3>{p.name}</h3>
            <p className="sp-price">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
