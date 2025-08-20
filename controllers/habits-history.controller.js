import { pool } from "../helpers/mysql-config.js";

const insertCompletionChecks = async (req, res) => {
  try {
    const { email } = req.email;
    const [user_id] = await pool.query("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    const { date } = req.body;
    if (!date) {
      return res.status(400).json({ error: "Enter all fields" });
    }
    const [habit_ids] = await pool.query(
      "SELECT id FROM habits WHERE user_id=?;",
      [user_id[0].id]
    );
    /*
    select the date that you want to insert
    if rows = 0
      execute results
    */
    const [result] = await pool.query(
      "INSERT INTO completion_history (completion_check, date,user_id,habit_id) VALUES ?",
      [habit_ids.map((habit_id) => [0, date, user_id[0].id, habit_id.id])]
    );
    res.status(201).json({ affectedRows: result.affectedRows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error at inserting completion checks" });
  }
};
const selectCompletionChecks = async (req, res) => {
  res.send("hello");
};
const updateCompletionCheck = async (req, res) => {
  res.send("hello");
};

export {
  insertCompletionChecks,
  selectCompletionChecks,
  updateCompletionCheck,
};
