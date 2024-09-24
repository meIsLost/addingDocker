import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import destinationRouter from "./routers/destinationRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(userRouter);
app.use(destinationRouter);
app.use(cors({
    credentials: true,
    origin: true
}));

const PORT = 8082;
app.listen(PORT, () => console.log("Port is running on", PORT));
