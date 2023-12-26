import express from "express";
import dotenv from "dotenv";
import { App } from "./main";
import { routes } from "./routes/routes";
import { middlewares } from "./middlewares/express.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";
import { DBConnection } from "./db/db";
import { Router } from "./routes/router";
import { initialQueries } from "./constants/initialQueries";

dotenv.config();

const privateRouter = new Router()
privateRouter.registerMiddleware(authMiddleware)
const publicRouter = new Router()

const db = new DBConnection({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT ?? "5432")
}, initialQueries);
const app = new App(express(), privateRouter.getRouter(), publicRouter.getRouter(), middlewares, routes, db);

app.listen(process.env.PORT);
