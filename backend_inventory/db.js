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
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

// db.connect((err) => {
//   if (err) {
//     console.log("DB Error:", err);
//   } else {
//     console.log("MySQL Connected");
//   }
// });

module.exports = db;
// https://function-bun-production-cb0f.up.railway.app/