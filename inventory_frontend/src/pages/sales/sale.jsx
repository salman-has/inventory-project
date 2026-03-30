import { useEffect, useState } from "react";

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);

  // products load
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  //  add item
  const addItem = () => {
    setItems([
      ...items,
      { id: "", name: "", price: 0, quantity: 1 }
    ]);
  };

  //  handle change
  const handleChange = (index, field, value) => {
    const updated = [...items];

    if (field === "id") {
      const product = products.find((p) => p.id == value);
      if (product) {
        updated[index] = {
          ...updated[index],
          id: product.id,
          name: product.name,
          price: product.price
        };
      }
    } else {
      updated[index][field] = value;
    }

    setItems(updated);
  };

  //  submit sale
  const handleSubmit = () => {
    fetch("http://localhost:5000/products/sale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items })
    })
      .then((res) => res.json())
      .then(() => {
        alert("Sale done");
        setItems([]);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Sales</h2>

      <button onClick={addItem}>+ Add Item</button>

      {items.map((item, index) => (
        <div key={index} style={{ marginTop: "10px" }}>
          
          {/* Product select */}
          <select
            value={item.id}
            onChange={(e) => handleChange(index, "id", e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Quantity */}
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleChange(index, "quantity", e.target.value)
            }
            style={{ marginLeft: "10px" }}
          />

          {/* Price */}
          <span style={{ marginLeft: "10px" }}>
            ₹{item.price}
          </span>
        </div>
      ))}

      <br />
      <button onClick={handleSubmit}>Submit Sale</button>
    </div>
  );
}