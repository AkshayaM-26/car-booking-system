const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
  year: { type: String },
  fuel: { type: String },
  mileage: { type: String },
  features: { type: String },
});

module.exports = mongoose.model("Car", carSchema);