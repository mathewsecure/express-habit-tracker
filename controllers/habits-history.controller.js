import { pool } from "../helpers/mysql-config.js";

const insertCompletionChecks = async (req, res) => {
  res.status(201);
};
const selectCompletionChecks = async (req, res) => {
  res.status(201);
  console.log("hello");
};
const updateCompletionCheck = async (req, res) => {
  res.status(201);
};

export {
  insertCompletionChecks,
  selectCompletionChecks,
  updateCompletionCheck,
};
