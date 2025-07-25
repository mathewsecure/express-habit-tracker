import { pool } from "../helpers/mysql-config.js";

const selectHabits = async (req, res) => {
  const { user_id } = req.body;
  const [habits] = await pool.query(
    "SELECT * FROM habits WHERE user_id=? ORDER BY date DESC",
    [user_id]
  );
  res.json({ habits });
};

const insertHabit = async (req, res) => {
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

const updateHabitCompletion = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Enter habit id" });
    }
    const [result] = await pool.query(
      "UPDATE habits SET completed=NOT completed WHERE id=?",
      [id]
    );
    res.status(201).json({
      result,
    });
  } catch (error) {
    console.error("Error at updating habit completion", error);
    res.status(500).send(error.message);
  }
};

export { selectHabits, insertHabit, updateHabitCompletion };
