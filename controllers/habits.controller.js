import { pool } from "../helpers/mysql-config.js";

const selectHabits = async (req, res) => {
  const { email } = req.email;
  const [user_id] = await pool.query("SELECT id FROM users WHERE email=?", [
    email,
  ]);
  const [habits] = await pool.query(
    "SELECT * FROM habits WHERE user_id=? ORDER BY date DESC",
    [user_id[0].id]
  );
  res.json({ habits });
};

const insertHabit = async (req, res) => {
  try {
    const { email } = req.email;
    const [user_id] = await pool.query("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    const { habit, completed } = req.body;
    if (!habit || !completed) {
      return res.status(400).json({ error: "Enter all fields" });
    }
    const [result] = await pool.query(
      "INSERT INTO habits (habit, completed, user_id) VALUES (?, ?, ?)",
      [habit, completed, user_id[0].id]
    );
    res.status(201).json({ affectedRows: result.affectedRows });
  } catch (error) {
    console.error("Error at inserting habit", error);
    res.status(500).send(error.message);
  }
};

const updateHabitCompletion = async (req, res) => {
  try {
    const { email } = req.email;
    const [user_id] = await pool.query("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Enter habit id" });
    }
    const [result] = await pool.query(
      "UPDATE habits SET completed=NOT completed WHERE id=? AND user_id=?",
      [id, user_id[0].id]
    );
    res.status(201).json({ affectedRows: result.affectedRows });
  } catch (error) {
    console.error("Error at updating habit completion", error);
    res.status(500).send(error.message);
  }
};

const updateHabitName = async (req, res) => {
  try {
    const { email } = req.email;
    const [user_id] = await pool.query("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    const { id, habitNameReplacement } = req.body;
    if (!id || !habitNameReplacement) {
      return res
        .status(400)
        .json({ error: "Enter habit id and habit name replacement" });
    }
    const [result] = await pool.query(
      "UPDATE habits SET habit=? WHERE id=? AND user_id=?",
      [habitNameReplacement, id, user_id[0].id]
    );
    res.status(201).json({ affectedRows: result.affectedRows });
  } catch (error) {
    console.error("Error at updating habit name replacement", error);
    res.status(500).send(error.message);
  }
};

const deleteHabit = async (req, res) => {
  try {
    /*
    TODO: implementation of less repetitive code
  select user_id of email
  DELETE FROM habits WHERE id=? and user_id =? <-- check how to do it without repeating code like in selectHabits function
   */
    const { email } = req.email;
    const [user_id] = await pool.query("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Enter habit id" });
    }
    const [result] = await pool.query(
      "DELETE FROM habits WHERE id=? AND user_id=?",
      [id, user_id[0].id]
    );
    res.status(201).json({ affectedRows: result.affectedRows });
  } catch (error) {
    console.error("Error at deleting habit", error);
    res.status(500).send(error.message);
  }
};
export {
  selectHabits,
  insertHabit,
  updateHabitCompletion,
  updateHabitName,
  deleteHabit,
};
