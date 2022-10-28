import express from "express";
import dotenv from "dotenv";
import api from "./api";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT);

app.use("/api", api);

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
