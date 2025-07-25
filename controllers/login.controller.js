import { pool } from "../helpers/mysql-config.js";
import jwt from "jsonwebtoken";

const doLogin = async (req, res) => {
  try {
    let token = "";
    let result = "";
    const email = req.body.email;
    const password = req.body.password;
    const [rows] = await pool.query(
      "SELECT COUNT(*) as quantity FROM users WHERE email=? and password=SHA2(?,224)",
      [email, password]
    );

    if (rows[0].quantity === 1) {
      token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 3600000,
      });
      result = { token: token, message: "User authenticated" };
    } else {
      result = { token: null, message: "Email or password are not correct" };
    }
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error trying to log in" });
  }
};

export { doLogin };
