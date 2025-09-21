import express from "express";
const router = express.Router();
import {
  selectHabits,
  insertHabit,
  updateHabitName,
  deleteHabit,
} from "../controllers/habits.controller.js";
import { middleware } from "../middleware/jwt.middleware.js";

router.get("/", middleware, selectHabits);
router.post("/", middleware, insertHabit);
router.patch("/", middleware, updateHabitName);
router.delete("/:id", middleware, deleteHabit);

export { router };
