import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { router as habits } from "./routes/habits.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

app.use("/", habits);
