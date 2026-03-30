import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    stock: ""
  });

  //🔥 Load existing product
  useEffect(() => {
    fetch(`http://localhost:5000/products/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
         setForm(data[0]);
      console.log(data);
      })
     
  }, [id]);


  const handleChange = (e) => {
    
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/products/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then(() => {
        alert("Product updated");
        navigate("/product_page");
      });
  };

  return (
    <div className="container">
      <h2>✏️ Update Product</h2>

      <form onSubmit={handleSubmit} className="form">

       

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Grocery">Grocery</option>
        </select>

          <input
          type="number"
          name="id"
          value={form.id}
          onChange={handleChange}
        />

         <input
          type="text"
          name="product_id"
          value={form.product_id}
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}