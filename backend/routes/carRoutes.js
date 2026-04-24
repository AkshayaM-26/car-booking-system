const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Get user's cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add to cart
router.post("/", async (req, res) => {
  try {
    const { userId, car } = req.body;
    const newItem = new Cart({ userId, car });
    await newItem.save();
    res.json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from cart
router.delete("/:userId/:carId", async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId, "car.id": req.params.carId });
    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;