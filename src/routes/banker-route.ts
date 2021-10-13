import express from "express";
import Banker from "../entities/Banker";

const router = express.Router();

router.get("/api/bankers", (req, res) => {
  res.send("Hello World");
});

// create client
router.post("/api/bankers", async (req, res) => {
  const { firstName, lastName, email, cardNumber, employNumber } = req.body;

  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    employee_number: employNumber,
  });

  // Save it
  await banker.save();

  // Return it
  return res.json(banker);
});

export { router as bankerRoute };
