import { createConnection } from "typeorm";
import * as dotenv from "dotenv";
import Client from "./entities/Client";

// Enable dotenv
dotenv.config();

const connectDB = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: process.env.DB_SYNCHRONIZE === "true",
      entities: [Client]
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect the DB")
  }
}

connectDB();