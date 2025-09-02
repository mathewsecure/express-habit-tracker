import express from "express";
const router = express.Router();
import {
  insertCompletionChecks,
  selectCompletionChecks,
  updateCompletionCheck,
  selectAllCompletionChecks,
} from "../controllers/habits-history.controller.js";
import { middleware } from "../middleware/jwt.middleware.js";

router.get("/:date", middleware, selectCompletionChecks);
router.post("/", middleware, insertCompletionChecks);
router.put("/", middleware, updateCompletionCheck);
router.get("/", middleware, selectAllCompletionChecks);

export { router };
