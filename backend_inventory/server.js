const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/product_route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/products", productRoutes);

//code aadded for test...
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000 ");
});

