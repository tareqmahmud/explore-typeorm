import { createConnection } from "typeorm";
import express from "express";
import * as dotenv from "dotenv";
import Client from "./entities/Client";
import Banker from "./entities/Banker";
import Transaction from "./entities/Transaction";

// Enable dotenv
dotenv.config();

// Express app
const app = express();

// Middleware
app.use(express.json());

// Connect DB
const connectDB = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: process.env.DB_SYNCHRONIZE === "true",
      entities: [Client, Banker, Transaction],
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect the DB");
  }
};

app.listen(3000, async () => {
  // Connect the DB
  await connectDB();

  // Show app running message
  console.log("App is on fire 🔥");
});
