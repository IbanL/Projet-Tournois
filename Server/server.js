import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());

import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import tournamentRoutes from "./routes/tournamentsRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/tournaments", tournamentRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req,res) => {
    res.send("bienvenue sur le back de l'application tournois");
})


app.use(errorHandler);

app.listen(PORT, () =>{ 
    console.log("server opérationnel sur http://localhost:"+PORT);
});