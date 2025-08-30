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
    const [date_existance] = await pool.query(
      "SELECT 1 FROM completion_history WHERE date=? AND user_id=?",
      [date, user_id[0].id]
    );
    if (date_existance.length < 1) {
      const [habit_ids] = await pool.query(
        "SELECT id FROM habits WHERE user_id=?;",
        [user_id[0].id]
      );
      const [result] = await pool.query(
        "INSERT INTO completion_history (completion_check, date,user_id,habit_id) VALUES ?",
        [habit_ids.map((habit_id) => [0, date, user_id[0].id, habit_id.id])]
      );
      res.status(201).json({ affectedRows: result.affectedRows });
    }
    res.status(201).json({ affectedRows: 0 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error at inserting completion checks" });
  }
};
const selectCompletionChecks = async (req, res) => {
  try {
    const { email } = req.email;
    const [user_id] = await pool.query("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    const { date } = req.params;
    if (!date) {
      return res.status(400).json({ error: "Enter date as params" });
    }
    const [completion_checks] = await pool.query(
      "SELECT completion_check FROM completion_history WHERE user_id=? AND date=?",
      [user_id[0].id, date]
    );
    res.json({ completion_checks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error at getting completion checks" });
  }
};
const updateCompletionCheck = async (req, res) => {
  const dateTest = "2025-08-23";
  try {
    const { email } = req.email;
    const [user_id] = await pool.query("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Enter habit id as params" });
    }
    const [result] = await pool.query(
      "UPDATE completion_history SET completion_check=NOT completion_check WHERE date=? AND user_id=? AND id=?",
      [dateTest, user_id[0].id, id]
    );
    res.status(201).json({ affectedRows: result.affectedRows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error at updating habit completion" });
  }
};

export {
  insertCompletionChecks,
  selectCompletionChecks,
  updateCompletionCheck,
};
