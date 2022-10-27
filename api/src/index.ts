import express, { Request, Response, NextFunction ,Router} from "express";
import { json } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT);

app.use(cors());
app.use(json());

app.use("/ping", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url);
    // some logic
    next();
});

app.get("/ping", (req: Request, res: Response, next: NextFunction) => {
    res.send("pong");
});

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
