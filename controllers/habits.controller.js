import { pool } from "../helpers/mysql-config.js";

const selectHabits = (req, res) => {
  res.json({ habit1: "false" });
};

const insertHabits = async (req, res) => {
  try {
    const { habit, completed, user_id } = req.body;
    if (!habit || !completed || !user_id) {
      return res.status(400).json({ error: "Enter all fields" });
    }
    const [result] = await pool.query(
      "INSERT INTO habits (habit, completed, user_id) VALUES (?, ?, ?)",
      [habit, completed, user_id]
    );
    res.status(201).json({ result });
  } catch (error) {
    console.error("Error at inserting habit: ", error);
    res.status(500).json({ error: "Error at inserting habit: " });
  }
};

export { selectHabits, insertHabits };
