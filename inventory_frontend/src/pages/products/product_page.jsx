import { useEffect, useState } from "react";
import "./product_page.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductFilter from "../../components/filterProducts/filterProducts";


export default function Product_page() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();

  //update icon click
  function updateIconClick(pid) {
    navigate(`/updateProduct/${pid}`);
  }

  // delete function ....
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    // fetch(`http://localhost:5000/products/delete/${id}`, {
    fetch(`https://inventory-project-y1p5.onrender.com/products/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Deleted successfully");

        // UI update (without reload)
        setProducts(products.filter((p) => p.id !== id));
        console.log(products);
      })
      .catch((err) => console.log(err));
  };

  //function for filter
  const handleFilter = (filters) => {
  let filtered = allProducts;

  if (filters.category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  if (filters.id) {
    filtered = filtered.filter((p) => p.id == filters.id);
  }

  setProducts(filtered);
};

  useEffect(() => {
    // fetch(`http://localhost:5000/products/`)
    fetch(`https://inventory-project-y1p5.onrender.com/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setAllProducts(data);
        console.log(products);
       
      })
      .catch((err) => console.log(err));
      
  }, []);

  return (
    <div className="pp-container">
      {/* Sidebar */}
      <div className="pp-sidebar">
        <h2>Action</h2>
        <Link to="/add-product">
          <button className="pp-btn-add">+ Add Product</button>
        </Link>
        <ProductFilter onFilter={handleFilter}/>
      </div>

      {/* Content */}
      <div className="pp-content">
        <h2>📦 Products</h2>

        <div className="pp-table-wrapper">
          <table className="pp-table">
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
                  <td>₹{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <div className="pp-btn-group">
                      <button
                        className="pp-edit"
                        onClick={() => updateIconClick(p.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="pp-delete"
                        onClick={() => handleDelete(p.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
