import { pool } from "../helpers/mysql-config.js";

const selectHabits = async (req, res) => {
  const { id } = req.params;
  const [habits] = await pool.query(
    "SELECT * FROM habits WHERE user_id=? ORDER BY date DESC",
    [id]
  );
  const selectedHabits = habits[0];
  res.json(selectedHabits);
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
    res.status(201).json({
      id: result.insertId,
      habit,
      completed,
      date: new Date(),
      user_id,
    });
  } catch (error) {
    console.error("Error at inserting habit", error);
    res.status(500).send(error.message);
  }
};

export { selectHabits, insertHabits };
