import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./updateProduct.css";
import { useLocation } from "react-router-dom";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("id from product page =", id);

  const [form, setForm] = useState({
    id: "",
    category: "",
    product_id: "",
    name: "",
    price: "",
    stock: "",
  });

  //🔥 Load existing product
  useEffect(() => {
    fetch(`https://inventory-project-y1p5.onrender.com/products/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm(data[0]);
        console.log(data);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://inventory-project-y1p5.onrender.com/products/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Product updated");
        navigate("/product_page");
      });
  };

  return (
    <div className="up-container">
      <h2 className="up-title">✏️ Update Product</h2>

      <form onSubmit={handleSubmit} className="up-form">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="up-input"
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Grocery">Grocery</option>
        </select>
         <label htmlFor="id">ID</label>
        <input
          type="number"
          name="id"
          value={form.id}
          onChange={handleChange}
          className="up-input"
        />
         <label htmlFor="product_id">Product Code</label>
        <input
          type="text"
          name="product_id"
          value={form.product_id}
          onChange={handleChange}
          className="up-input"
        />
         <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="up-input"
        />
         <label htmlFor="price">Price INR.</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="up-input"
        />
         <label htmlFor="stock">No. of Stocks</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="up-input"
        />

        <button type="submit" className="up-btn">
          Update Product
        </button>
      </form>
    </div>
  );
}
