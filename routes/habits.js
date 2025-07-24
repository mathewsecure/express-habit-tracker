import express from "express";
const router = express.Router();
import {
  selectHabits,
  insertHabits,
  updateHabitsCompletion,
} from "../controllers/habits.controller.js";

router.get("/", selectHabits);
router.post("/", insertHabits);
router.patch("/", updateHabitsCompletion);

export { router };
