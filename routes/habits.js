import express from "express";
const router = express.Router();
import {
  selectHabits,
  insertHabit,
  updateHabitCompletion,
} from "../controllers/habits.controller.js";
import { middleware } from "../middleware/jwt.middleware.js";

router.get("/", middleware, selectHabits);
router.post("/", insertHabit);
router.patch("/", updateHabitCompletion);

export { router };
