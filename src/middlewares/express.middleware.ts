import express from "express";
import morgan from "morgan"
export const middlewares = [
  express.json(),
  express.urlencoded({ extended: true }),
  morgan("dev")
];
