const express = require("express");
const router = express.Router();
const db = require("../db");

// GET products by category
router.get("/category/:category", (req, res) => {
  const category = req.params.category;
  if (category && category != "") {
    const sql = "SELECT * FROM products WHERE category = ?";
    db.query(sql, [category], (err, result) => {
      if (err) return res.send(err);
      res.json(result);
    });
  }
});

//get- product by id...
router.get("/id/:id", (req, res)=>{
  const id=req.params.id;
  console.log("ID received:", id); 
  if(id && id !=""){
    const sql="SELECT * FROM products WHERE id = ?";
    db.query(sql, [id], (err, result)=>{
      if(err) return res.send(err);
      console.log("DB result:", result);
      res.json(result);
    });
  }
});

//getting all deafult products
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    
    if (err) {
      console.log("SQL ERROR:", err);   // 👈
      res.json(err);
    } else {
      res.json(result);
    }
  });
});



// ADD product
router.post("/addpro", (req, res) => {
  const { category, product_id, name, price, stock } = req.body;
  const sql =
    "INSERT INTO products(category, product_id, name, price, stock) VALUES (?,?,?,?,?)";
   db.query(sql, [category, product_id, name, price, stock], (err, result) => {
    if (err) return res.send(err);
    res.json({ message: "Product added" });
  });
});

// UPDATE product
router.put("/update/:id", (req, res) => {
  const { category, product_id, name, price, stock } = req.body;
  db.query(
    "UPDATE products SET category=?, product_id=?, name=?, price=?, stock = ? WHERE id = ?",
    [category, product_id, name, price, stock, parseInt(req.params.id)],
    (err, result) => {
      if (err) return res.send(err);
      res.json({ message: "Stock updated" });
    },
  );
});

// DELETE product
router.delete("/delete/:id", (req, res) => {
  db.query(
    "DELETE FROM products WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.send(err);
      res.json({ message: "Deleted" });
    },
  );
});

//sales product report
router.post("/sale", async (req, res) => {
  
 const { items } = req.body;

 console.log("body: ", req.body);

//  correct validation
if (!items || items.length === 0) {
  return res.json({ message: "Invalid data" });
}
  try {
    let total = 0;

    for (let item of items) {
      total += item.price * item.quantity;
    }

    const [orderResult] = await db
      .promise()
      .query(
        "INSERT INTO orders_manage (total_orders, total_sales) VALUES (?, ?)",
        [0, 0],
      );

    const orderId = orderResult.insertId;

    for (let item of items) {
      const [result] = await db
        .promise()
        .query("SELECT * FROM products WHERE id = ?", [item.id]);

      if (result.length === 0) {
        return res.status(400).json({
          error: `Product ${item.id} not found`,
        });
      }

      const product = result[0];
      // console.log("result in product =  ", product);

      if (product.stock < item.quantity) {
        if (product.stock === 0) {
          return res.json({
            message: `Product ${product.name} is not avaible yet , thank you`,
          });
        } else {
          return res.status(400).json({
            error: `Available stock is ${product.stock} only, for  ${product.name}`,
          });
        }
      }

      await db
        .promise()
        .query(
          "INSERT INTO order_items (order_id, p_id, quantity, price, total) VALUES (?, ?, ?, ?,?)",
          [orderId, item.id, item.quantity, item.price, total],
        );

      await db
        .promise()
        .query("UPDATE products SET stock = stock - ? WHERE id = ?", [
          item.quantity,
          item.id,
        ]);
    }

    // count nikala
    const [rows_order] = await db
      .promise()
      .query("SELECT COUNT(*) AS total_ord FROM order_items");
    const totalOrders = rows_order[0].total_ord;

    // some of total_sales
    const [sumOFtotal] = await db
      .promise()
      .query("SELECT SUM(total) AS totalAmount FROM order_items");
    const totalAmountSale = sumOFtotal[0].totalAmount;

    //update  latest values
    await db
      .promise()
      .query(
        "UPDATE orders_manage SET total_orders = ?, total_sales = ? WHERE id = ?",
        [totalOrders, totalAmountSale, orderId],
      );

    res.json({ message: "Sale completed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

//filter sales report\
router.get("/sales-report", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const [rows] = await db.promise().query(
      `SELECT 
        p.category,
        p.name,
        SUM(oi.quantity) AS total_quantity,
        SUM(oi.total) AS total_sales
        FROM order_items oi
        JOIN products p ON p.id = oi.p_id
        WHERE oi.order_date >= ? 
        AND oi.order_date < DATE_ADD(?, INTERVAL 1 DAY)
        GROUP BY p.category, p.name`,
      [startDate, endDate],
    );
    console.log(rows);

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching report" });
  }
});

//sales report view by selected data 
router.get("/report/sales", async (req, res) => {
  const { startDate, endDate, category } = req.query;

  try {
    let query = `
      SELECT 
        oi.id,
        p.category,
        p.name,
        oi.quantity,
        oi.price,
        oi.total,
        oi.order_date
      FROM order_items oi
      JOIN products p ON p.id = oi.p_id
      WHERE 1=1
    `;

    let params = [];

    //date filter
    if (startDate && endDate) {
      query += `
        AND oi.order_date >= ?
        AND oi.order_date < DATE_ADD(?, INTERVAL 1 DAY)
      `;
      params.push(startDate, endDate);
    }

    // category filter
    if (category) {
      query += ` AND p.category = ? `;
      params.push(category);
    }

    //latest first
    query += ` ORDER BY oi.order_date DESC`;

    const [rows] = await db.promise().query(query, params);

    res.json(rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});


//top five rows filter according date and category
router.get("/report/top-sale-products", async (req, res) => {
  const { startDate, endDate, category } = req.query;

  try {
    let query = `
      SELECT 
        p.category,
        p.name,
        SUM(oi.quantity) AS total_qty,
        SUM(oi.total) AS total_sales
      FROM order_items oi
      JOIN products p ON p.id = oi.p_id
      WHERE 1=1
    `;

    let params = [];

    // date filter
    if (startDate && endDate) {
      query += `
        AND oi.order_date >= ?
        AND oi.order_date < DATE_ADD(?, INTERVAL 1 DAY)
      `;
      params.push(startDate, endDate);
    }

    // category filter
    if (category) {
      query += ` AND p.category = ? `;
      params.push(category);
    }

    //  grouping + top 5
    query += `
      GROUP BY p.category, p.name
      ORDER BY total_qty DESC
      LIMIT 5
    `;

    const [rows] = await db.promise().query(query, params);

    res.json(rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

//summary report
router.get("/report/summary", async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        COUNT(DISTINCT order_id) AS total_orders,
        IFNULL(SUM(total), 0) AS total_revenue
      FROM order_items
    `);

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching summary." });
  }
});


//top sale report...
router.get("/report/top-sale", async(req,res)=>{
  try{
    const [rows] = await db.promise().query(
      ` SELECT 
        p.id,
        p.category,
        p.name,
        SUM(oi.quantity) AS total_quantity
      FROM order_items oi
      JOIN products p ON p.id = oi.p_id
      GROUP BY p.id, p.category, p.name
      ORDER BY total_quantity DESC
      LIMIT 5`
    )
    res.json(rows);
  }

  catch(err){
    res.status(500).json({error: " Error fetching in top sales report."})

  }
});

// report of category-wise sales
router.get("/report/category-sale", async(req, res)=>{
  try{
      const [rows] = await db.promise().query(
        `SELECT 
        p.category,
        SUM(oi.quantity) AS total_quantity,
        IFNULL(SUM(oi.total), 0) AS total_sales
      FROM order_items oi
      JOIN products p ON p.id = oi.p_id
      GROUP BY p.category
      ORDER BY total_sales DESC`
      ) 

      res.json(rows);
  }
  catch(err){
    res.status(500).json({error : "Error fatching category wise sale report."});
  }
 
});

// low stock product find 
router.get("/report/low-stock", async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT name, stock
      FROM products
      WHERE stock <= 10
      ORDER BY stock ASC
      LIMIT 1
    `);

    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: "Error fetching low stock" });
  }
});
module.exports = router;
