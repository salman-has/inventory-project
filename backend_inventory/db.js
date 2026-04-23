const mysql = require("mysql2");

     //--local database      conneion
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: "usersh",
//   password: "",
//   database: "inventory"
// });

//hosted databsser Railway...
const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  password:process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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