import express from "express";
import { customLogger } from "./customLogger.middleware";
import { notFoundHandler } from "./404Handler.middleware";

export const middlewares = [
  express.json(),
  express.urlencoded({ extended: true }),
  notFoundHandler,
  customLogger
];
