import { pool } from "../helpers/mysql-config.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
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
        expiresIn: "7d",
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

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    //TODO: add validations
    if (!email || !password) {
      return res.status(400).json({ error: "Enter all fields" });
    }
    const [result] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, SHA2(?,224))",
      [email, password]
    );
    res.status(201).json({
      "Succesfully registered": email,
    });
  } catch (error) {
    console.error("Error at registering", error);
    res.status(500).send(error.message);
  }
};

export { login, signUp };
