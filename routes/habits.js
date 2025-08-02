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
router.post("/", middleware, insertHabit);
router.put("/:id", middleware, updateHabitCompletion);
router.patch("/", middleware, updateHabitName);
router.delete("/:id", middleware, deleteHabit);

export { router };
