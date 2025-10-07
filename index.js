import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { router as habits } from "./routes/habits.js";
import { router as auth } from "./routes/auth.js";
import { router as habitsHistory } from "./routes/habits-history.js";
import { router as dates } from "./routes/dates.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

app.use("/habits", habits);
app.use("/auth", auth);
app.use("/habits-history", habitsHistory);
app.use("/dates", dates);
