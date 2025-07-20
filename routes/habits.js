import express from "express";
const router = express.Router();
import { getHabits } from "../controllers/habits.controller.js";

router.get("/", getHabits);

export { router };
