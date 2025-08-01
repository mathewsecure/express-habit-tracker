import express from "express";
const router = express.Router();
import {
  selectHabits,
  insertHabit,
  updateHabitCompletion,
  updateHabitName,
  deleteHabit,
} from "../controllers/habits.controller.js";
import { middleware } from "../middleware/jwt.middleware.js";

router.get("/", middleware, selectHabits);
router.post("/", insertHabit);
router.put("/:id", updateHabitCompletion);
router.patch("/", updateHabitName);
router.delete("/:id", deleteHabit);

export { router };
