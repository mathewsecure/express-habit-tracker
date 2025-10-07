import express from "express";
const router = express.Router();
import { insertDates, selectDates } from "../controllers/dates.controller.js";
import { middleware } from "../middleware/jwt.middleware.js";

router.get("/", middleware, selectDates);
router.post("/:date", middleware, insertDates);

export { router };
