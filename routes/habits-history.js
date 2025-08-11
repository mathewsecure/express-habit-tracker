import express from "express";
const router = express.Router();
import {
  insertCompletionChecks,
  selectCompletionChecks,
  updateCompletionCheck,
} from "../controllers/habits-history.controller.js";
import { middleware } from "../middleware/jwt.middleware.js";

router.get("/", middleware, selectCompletionChecks);
router.post("/", middleware, insertCompletionChecks);
router.put("/", middleware, updateCompletionCheck);

export { router };
