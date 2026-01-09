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
  try {
    const { email } = req.email;
    const [user_id] = await pool.query("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    const { date } = req.params;
    if (!date) {
      return res.status(400).json({ error: "Enter the date as param" });
    }
    const [existing] = await pool.query(
      "SELECT id FROM dates WHERE date=? AND user_id=?",
      [date, user_id[0].id]
    );
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ error: "Date already exists for this user" });
    }
    const [result] = await pool.query(
      "INSERT INTO dates(date,user_id) VALUES (?,?)",
      [date, user_id[0].id]
    );
    res.status(201).json({ affectedRows: result.affectedRows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error at inserting dates" });
  }
};

export { selectDates, insertDates };
