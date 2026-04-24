const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

// Add to wishlist
router.post("/", async (req, res) => {
  try {
    const { userEmail, car } = req.body;

    let wishlist = await Wishlist.findOne({ userEmail });
    if (!wishlist) {
      wishlist = new Wishlist({ userEmail, car: [car] });
    } else {
      const exists = wishlist.car.find((c) => c.id === car.id);
      if (!exists) wishlist.car.push(car);
    }

    await wishlist.save();
    res.json({ message: "Added to wishlist ❤️", wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get wishlist by user
router.get("/:userEmail", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userEmail: req.params.userEmail });
    res.json(wishlist || { car: [] });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Remove from wishlist
router.delete("/:userEmail/:carId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userEmail: req.params.userEmail });
    if (wishlist) {
      wishlist.car = wishlist.car.filter((c) => c.id != req.params.carId);
      await wishlist.save();
    }
    res.json({ message: "Removed ❤️", wishlist });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;