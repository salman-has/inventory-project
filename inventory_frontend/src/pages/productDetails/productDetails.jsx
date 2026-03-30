import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productDetails.css";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);

  // 🔥 load product + related
  useEffect(() => {
    const loadData = async () => {
      try {
        // product fetch
        const res = await fetch(`http://localhost:5000/products/${id}`);
        const data = await res.json();

        setProduct(data);

        // related products (same category)
        const res2 = await fetch(
          `http://localhost:5000/products/category/${data.category}`
        );
        const relatedData = await res2.json();

        setRelated(relatedData);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, [id]);

  // 🔥 total calculate
  const total = qty * (product?.price || 0);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      
      {/* 🔥 Main Product */}
      <div style={{ display: "flex", gap: "20px" }}>
        <img src="https://via.placeholder.com/200" alt={product.name} />

        <div>
          <h2>{product.name}</h2>
          <p>Category: {product.category}</p>
          <h3>₹{product.price}</h3>

          <input
            type="number"
            value={qty}
            min="1"
            onChange={(e) => setQty(e.target.value)}
          />

          <h3>Total: ₹{total}</h3>

          <button onClick={() => alert("Order placed!")}>
            Order
          </button>
        </div>
      </div>

      {/* 🔥 Related Products */}
      <h3 style={{ marginTop: "30px" }}>Related Products</h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))",
        gap: "10px"
      }}>
        {related.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <p>{p.name}</p>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}