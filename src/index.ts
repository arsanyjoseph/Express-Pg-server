import express, { Router } from "express";
import dotenv from "dotenv";
import { App } from "./main";
import { routes } from "./routes/routes";
import { middlewares } from "./middlewares";
import { DBConnection } from "./modules/db/db";

dotenv.config();

const db = new DBConnection({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT ?? "5432")
});
const app = new App(express(), Router(), middlewares, routes, db);

app.listen(process.env.PORT);
