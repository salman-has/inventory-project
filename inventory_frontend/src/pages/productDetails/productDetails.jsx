import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productDetails.css";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [items, setItems] = useState([]);

  // load product + related
  useEffect(() => {
    const loadData = async () => {
      try {

        // product fetch
        // const res = await fetch(`http://localhost:5000/products/id/${id}`);
        const res = await fetch(`  https://inventory-project-y1p5.onrender.com/products/id/${id}`);
      
        const data = await res.json();

        setProduct(data[0]);
        console.log("prd= ",product);

        // related products (same category)
        const res2 = await fetch(
          // `http://localhost:5000/products/category/${data[0].category}`,
           `https://inventory-project-y1p5.onrender.com/products/category/${data[0].category}`,
        );
        const relatedData = await res2.json();

        setRelated(relatedData);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, [id]);

  //  total calculate

  const total = qty * (product?.price || 0);

  const handleOrder = async () => {
    try {
      const res = await fetch("https://inventory-project-y1p5.onrender.com/products/sale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              id: product.id,
              quantity: Number(qty),
              price: Number(product.price),
            },
          ],
        }),
      });

      const data = await res.json();

      alert(data.message);

      // stock update UI
      setProduct({
        ...product,
        stock: product.stock - qty,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (related.length === 0) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="pd-container">
  {/* Main Product */}
  <div className="pd-wrapper">
    <img
      src="https://via.placeholder.com/200"
      alt={product.name}
      className="pd-img"
    />

    <div className="pd-info">
      <h2 className="pd-title">{product.name}</h2>
      <p className="pd-category">Category: {product.category}</p>
      <h3 className="pd-price">₹{product.price}</h3>

      <input
        type="number"
        value={qty}
        min="1"
        className="pd-qty"
        onChange={(e) => setQty(e.target.value)}
      />

      <h3 className="pd-total">Total: ₹{total}</h3>

      <button className="pd-btn" onClick={handleOrder}>
        🛒 Order Now
      </button>
    </div>
  </div>

  {/* Related */}
  <h3 className="pd-related-title">Related Products</h3>

  <div className="pd-grid">
    {related.map((p) => (
      <div key={p.id} className="pd-card">
        <p className="pd-card-name">{p.name}</p>
        <p className="pd-card-price">₹{p.price}</p>
      </div>
    ))}
  </div>
</div>
    
  );
}
