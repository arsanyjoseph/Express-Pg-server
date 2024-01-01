import express from "express";
import dotenv from "dotenv";
import { App } from "./main";
import { registerModules } from "./utils/registerModules";
import { middlewares } from "./middlewares/express.middleware";
import { DBConnection } from "./db/db";
import { initialQueries } from "./constants/initialQueries";
import { ValidatorMiddleware } from "./middlewares/validator.middleware";

dotenv.config();

const db = new DBConnection({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT ?? "5432")
}, initialQueries);


const app = new App(express(), middlewares, db, registerModules, new ValidatorMiddleware());

app.listen(process.env.PORT);
