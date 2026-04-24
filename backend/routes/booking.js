const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// ✅ GET all bookings (for admin)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error ❌" });
  }
});

// ✅ DELETE booking
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error ❌" });
  }
});

module.exports = router;