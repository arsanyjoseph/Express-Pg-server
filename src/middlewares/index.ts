import express from "express";
export const middlewares = [
  express.json(),
  express.urlencoded({ extended: true })
];
