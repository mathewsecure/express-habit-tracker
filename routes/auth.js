import express from "express";
const router = express.Router();
import { login, signUp } from "../controllers/auth.controller.js";

router.post("/login", login);
router.post("/signup", signUp);
export { router };
