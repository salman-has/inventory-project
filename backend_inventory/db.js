const mysql = require("mysql2");

     //--local database      conneion
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: "usersh",
//   password: "",
//   database: "inventory"
// });

//hosted databsser Railway...
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQLDATABASE,
  port: process.env.DB_PORT   // 👈 
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
// https://function-bun-production-cb0f.up.railway.app/