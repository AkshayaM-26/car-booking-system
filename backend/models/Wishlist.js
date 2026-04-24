const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userEmail: String,
  wishlist: Array,
});

module.exports = mongoose.model("Wishlist", wishlistSchema);