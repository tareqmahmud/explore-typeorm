import { createConnection } from "typeorm";
import express from "express";
import * as dotenv from "dotenv";
import Client from "./entities/Client";
import Banker from "./entities/Banker";
import Transaction from "./entities/Transaction";
import { clientRouter } from "./routes/client-route";
import { bankerRoute } from "./routes/banker-route";
import { transactionRoute } from "./routes/transaction-route";

// Enable dotenv
dotenv.config();

// Express app
const app = express();

// Middleware
app.use(express.json());

// Connect routes
app.use(clientRouter);
app.use(bankerRoute);
app.use(transactionRoute);

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
