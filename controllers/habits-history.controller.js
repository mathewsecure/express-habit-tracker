import { pool } from "../helpers/mysql-config.js";

const insertCompletionChecks = async (req, res) => {
  try {
    const datePassedFromFrontend = "Wed Aug 13 2025";
    const { email } = req.email;
    const [user_id] = await pool.query("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    const [habit_ids] = await pool.query(
      "SELECT id FROM habits WHERE user_id=?;",
      [user_id[0].id]
    );
    const [result] = await pool.query(
      "INSERT INTO completion_history (completion_check, date,user_id,habit_id) VALUES ?",
      [
        habit_ids.map((habit_id) => [
          0,
          datePassedFromFrontend,
          user_id[0].id,
          habit_id.id,
        ]),
      ]
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
