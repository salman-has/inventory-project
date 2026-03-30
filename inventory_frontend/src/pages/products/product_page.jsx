import { useEffect, useState } from "react";
import "./product_page.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Product_page() {
  const [products, setProducts] = useState([]);

const navigate = useNavigate();

//update icon click
function updateIconClick(pid){
 
  navigate(`/updateProduct/${pid}`);

}

// delete function ....
const handleDelete = (id) => {
  if (!window.confirm("Are you sure to delete?")) return;

  fetch(`http://localhost:5000/products/delete/${id}`, {
    method: "DELETE"
  })
    .then((res) => res.json())
    .then(() => {
      alert("Deleted successfully");

      // UI update (without reload)
      setProducts(products.filter((p) => p.id !== id));
    })
    .catch((err) => console.log(err));
};


  useEffect(() => {
    fetch(`http://localhost:5000/products/`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
      
  }, []);

  return (
    <div className="product-container">
      <div className="sidebar">
        <h2>Action</h2>
         <Link to="/add-product">
        <button className="btn-addproduct">+ Add Product</button>
      </Link>
      </div>

      <div style={{ padding: "20px" }} className="content">
        <h2>📦 Products</h2>

        <table border="1" cellPadding="10" className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Product Id</th>
              <th>Name</th>

              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.category}</td>
                <td>{p.product_id}</td>
                <td>{p.name}</td>

                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                   <div className="btn-div">
                      <button onClick={() => updateIconClick(p.id)}>✏️ Edit</button>
                      <button onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
