import express from "express";
import { customLogger } from "./customLogger.middleware";
export const middlewares = [
  express.json(),
  express.urlencoded({ extended: true }),
  customLogger
];
