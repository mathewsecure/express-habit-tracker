import { pool } from "../helpers/mysql-config.js";

const selectDates = async (req, res) => {
  try {
    const { email } = req.email;
    const [user_id] = await pool.query("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    const [dates] = await pool.query(
      "SELECT date FROM dates WHERE user_id=? ORDER BY date ASC",
      [user_id[0].id]
    );
    res.json({ dates });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error at getting dates" });
  }
};

const insertDates = async (req, res) => {
  res.send("post");
};

export { selectDates, insertDates };
