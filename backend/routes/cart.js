const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Add to cart
router.post("/", async (req, res) => {
  try {
    const { userEmail, car } = req.body;

    let cart = await Cart.findOne({ userEmail });
    if (!cart) {
      cart = new Cart({ userEmail, car: [car] });
    } else {
      // Check if car already exists
      const exists = cart.car.find((c) => c.id === car.id);
      if (!exists) cart.car.push(car);
    }

    await cart.save();
    res.json({ message: "Added to cart ✅", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get cart by user
router.get("/:userEmail", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userEmail: req.params.userEmail });
    res.json(cart || { car: [] });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Remove from cart
router.delete("/:userEmail/:carId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userEmail: req.params.userEmail });
    if (cart) {
      cart.car = cart.car.filter((c) => c.id != req.params.carId);
      await cart.save();
    }
    res.json({ message: "Removed ✅", cart });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;