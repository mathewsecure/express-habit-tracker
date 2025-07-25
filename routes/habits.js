import express from "express";
const router = express.Router();
import {
  selectHabits,
  insertHabit,
  updateHabitCompletion,
} from "../controllers/habits.controller.js";

router.get("/", selectHabits);
router.post("/", insertHabit);
router.patch("/", updateHabitCompletion);

export { router };
