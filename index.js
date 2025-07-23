import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { router as habits } from "./routes/habits.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

app.use("/api/habits", habits);
