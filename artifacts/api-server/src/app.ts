import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/splash", express.static(path.join(process.cwd(), "public/splash")));

app.use("/api", router);

export default app;
