const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Car = require("../models/car");
const Booking = require("../models/Booking");


// 👤 REGISTER
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User Registered ✅");
});


// 🔐 LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    res.json(user);
  } else {
    res.status(401).send("Invalid credentials");
  }
});


// 🚗 ADD CAR (ADMIN)
router.post("/add-car", async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.send("Car Added ✅");
});


// 🚗 GET ALL CARS
router.get("/cars", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});


// 📦 BOOK CAR
router.post("/book", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.send("Booking Successful ✅");
});


// 📦 GET BOOKINGS (ADMIN)
router.get("/bookings", async (req, res) => {
  const data = await Booking.find();
  res.json(data);
});


module.exports = router;