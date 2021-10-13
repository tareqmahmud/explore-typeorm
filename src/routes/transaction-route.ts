import express from "express";
import Transaction, { TransactionTypes } from "../entities/Transaction";
import Client from "../entities/Client";

const router = express.Router();

router.post("/api/clients/:clientId/transaction", async (req, res) => {
  const { clientId } = req.params;

  const { type, amount } = req.body;

  const client = await Client.findOne({ id: parseInt(clientId) });

  // If there is no client
  if (!client) {
    return res.status(404).json({
      message: "No client has been found",
    });
  }

  const transaction = await Transaction.create({
    type,
    amount: amount,
    client,
  });

  await transaction.save();

  if (type === TransactionTypes.DEPOSIT) {
    client.balance += amount;
  } else if (type === TransactionTypes.WITHDRAW) {
    client.balance -= amount;
  }

  await client.save();

  return res.status(201).json({
    message: "Transaction Success",
  });
});

export { router as transactionRoute };
