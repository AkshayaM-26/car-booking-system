const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userEmail: String,
  cart: Array,   // store cars inside array
});

module.exports = mongoose.model("Cart", cartSchema);