import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import passport from "./utils/passport.utils.js";
import { config } from "./config/config.js";


const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());


//routes Authentication
app.use("/api/auth", authRoutes);

export default app;
