const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// ✅ GET all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cars" });
  }
});

// ✅ SEED 15 CARS (TEMP)
router.get("/seed", async (req, res) => {
  try {
    const cars = [
      { id: 1, name: "Maruti Suzuki Swift", price: "₹7 Lakh", rating: 4.2, image: "images/car1.jpg" },
      { id: 2, name: "Hyundai i20", price: "₹8.5 Lakh", rating: 4.5, image: "images/car2.jpg" },
      { id: 3, name: "Tata Nexon", price: "₹10 Lakh", rating: 4.6, image: "images/car3.jpg" },
      { id: 4, name: "Honda City", price: "₹12 Lakh", rating: 4.7, image: "images/car4.jpg" },
      { id: 5, name: "Maruti Alto", price: "₹5 Lakh", rating: 3.9, image: "images/car5.jpg" },
      { id: 6, name: "Hyundai Creta", price: "₹13 Lakh", rating: 4.6, image: "images/car6.jpg" },
      { id: 7, name: "Tata Tiago", price: "₹6 Lakh", rating: 4.1, image: "images/car7.jpg" },
      { id: 8, name: "Maruti Baleno", price: "₹8 Lakh", rating: 4.3, image: "images/car8.jpg" },
      { id: 9, name: "Hyundai Venue", price: "₹9 Lakh", rating: 4.2, image: "images/car9.jpg" },
      { id: 10, name: "Maruti Brezza", price: "₹11 Lakh", rating: 4.4, image: "images/car10.jpg" },
      { id: 11, name: "Toyota Innova", price: "₹18 Lakh", rating: 4.8, image: "images/car11.jpg" },
      { id: 12, name: "Maruti Ertiga", price: "₹10 Lakh", rating: 4.3, image: "images/car12.jpg" },
      { id: 13, name: "Renault Kiger", price: "₹7.5 Lakh", rating: 4.0, image: "images/car13.jpg" },
      { id: 14, name: "Nissan Magnite", price: "₹6.5 Lakh", rating: 4.1, image: "images/car14.jpg" },
      { id: 15, name: "Maruti Celerio", price: "₹6 Lakh", rating: 3.8, image: "images/car15.jpg" }
    ];

    await Car.insertMany(cars);

    res.json({ message: "15 cars inserted ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error inserting ❌" });
  }
});

module.exports = router;