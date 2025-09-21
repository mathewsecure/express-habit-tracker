import express from "express";
const router = express.Router();
import {
  insertCompletionChecks,
  updateCompletionCheck,
  selectAllCompletionChecks,
} from "../controllers/habits-history.controller.js";
import { middleware } from "../middleware/jwt.middleware.js";

router.post("/", middleware, insertCompletionChecks);
router.put("/", middleware, updateCompletionCheck);
router.get("/", middleware, selectAllCompletionChecks);

export { router };
