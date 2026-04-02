import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Dashboard from "../../pages/dashboard/dashboard";
import Product_page from "../../pages/products/product_page";
import Add_product from "../../pages/addproduct/add_product";
import UpdateProduct from "../../pages/UpdateProduct/UpdateProduct";
import Sales from "../../pages/sales/sale";
import SalesProduct from "../../pages/salesProduct/salesProduct";
import Report from "../../pages/report/report";
import ProductDetails from "../../pages/productDetails/productDetails";
import Footer from "../footer/footer";


// pages 



// const Reports = () => <h2>Reports Page</h2>;

function Router() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>} />
        <Route path="/product_page" element={<Product_page />} />
        <Route path="/add-product" element={<Add_product></Add_product>} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        {/* <Route path="/sales" element={<Sales></Sales>} /> */}
        <Route path="/salesProduct" element={<SalesProduct></SalesProduct>} />
        <Route path="/productDetails/id/:id" element={<ProductDetails></ProductDetails>} />
        <Route path="/report" element={<Report></Report>} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default Router;