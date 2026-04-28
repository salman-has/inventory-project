import { useState } from "react";
import "./add_product.css";

export default function Add_product() {
  const [form, setForm] = useState({
    // category: "",
    // produt_id: "",
    name: "",
    price: "",
    stock: "",
    category: "",
    product_id: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // fetch("http://localhost:5000/products/addpro", {
    fetch("https://inventory-project-y1p5.onrender.com/products/addpro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Product added successfully");
        setForm({
          
          name: "",
         
          price: "",
          stock: "",
          category: "",
          product_id: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="addproduct-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>➕ Add Product</h2>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Grocery">Grocery</option>
          <option value="Accessories">Accessories</option>
           <option value="Footwear">Footwear</option>
        </select>

        <input
          type="text"
          name="product_id"
          placeholder="Product Id"
          value={form.product_id}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
