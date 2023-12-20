import express, { Express } from "express"
import dotenv from "dotenv"
import { App } from "./main"

dotenv.config()

const app = new App(express())

app.listen()