import express from "express";
import dbConnection from "./db/config.js";
import dotenv from "dotenv";
import api from "./routes/api.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5500;
app.use(cors());
dbConnection();

app.use("/", api);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
