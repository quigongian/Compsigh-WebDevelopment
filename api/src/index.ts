import express from "express";
import dotenv from "dotenv";
import api from "./api";
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
const PORT = parseInt(process.env.PORT as string) || 3001;

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
