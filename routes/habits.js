import express from "express";
const router = express.Router();
import {
  selectHabits,
  insertHabits,
} from "../controllers/habits.controller.js";

router.get("/", selectHabits);
router.post("/", insertHabits);

export { router };
