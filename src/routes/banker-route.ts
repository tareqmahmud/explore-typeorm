import express from "express";
import Banker from "../entities/Banker";
import Client from "../entities/Client";

const router = express.Router();

router.get("/api/bankers", (req, res) => {
  res.send("Hello World");
});

// create banker
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

// Assign client to banker
router.put("/api/bankers/:bankerId/clients/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;

  const banker = await Banker.findOne({ id: parseInt(bankerId) });

  if (!banker) {
    return res.status(404).json({ message: "No banker is found" });
  }

  const client = await Client.findOne({ id: parseInt(clientId) });

  if (!client) {
    return res.status(404).json({ message: "No client is found" });
  }

  banker.clients = [client];

  await banker.save();

  return res.json({ message: "Client assign to the banker" });
});

export { router as bankerRoute };
