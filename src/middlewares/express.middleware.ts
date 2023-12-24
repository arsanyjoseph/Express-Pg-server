import express from "express";
import { customLogger } from "./logger.middleware";
export const middlewares = [
  express.json(),
  express.urlencoded({ extended: true }),
  customLogger
];
