import express from "express";
import Client from "../entities/Client";

const router = express.Router();

router.get("/api/clients", (req, res) => {
  res.send("Hello World");
});

// create client
router.post("/api/clients", async (req, res) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;

  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    balance,
  });

  // Save it
  await client.save();

  // Return it
  return res.json(client);
});

// Delete client
router.delete("/api/clients/:clientId", async (req, res) => {
  const { clientId } = req.params;

  const deleteClient = Client.delete({ id: parseInt(clientId) });

  if (!deleteClient) {
    return res.status(500).send("Something error");
  }

  return res.json({ message: "Client deleted successfully" });
});

export { router as clientRouter };
