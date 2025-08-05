import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

//https://sidorares.github.io/node-mysql2/docs#using-connection-pools
const pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  port: process.env.DBPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export { pool };
