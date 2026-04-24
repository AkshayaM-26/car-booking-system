require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// 📦 MODELS
// =========================
const Car = require("./models/Car");   
const Cart = require("./models/Cart");
const Wishlist = require("./models/Wishlist");
const User = require("./models/User");

// 🔗 ROUTES
// =========================
const carRoutes = require("./routes/car");
app.use("/api/cars", carRoutes);

const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);

const bookingRoutes = require("./routes/booking");
app.use("/api/booking", bookingRoutes);

const Booking = require("./models/Booking"); 

// 🚀 BOOKING API
// =========================
app.post("/api/booking", async (req, res) => {
  try {
    const { name, email, phone, address, cart } = req.body;

    console.log("Incoming booking:", req.body); // 🔥 debug

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart empty ❌" });
    }

    const newBooking = new Booking({
      name,
      email,
      phone,
      address,
      cart,
    });

    await newBooking.save();

    res.json({ message: "Booking success ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Booking failed ❌" });
  }
});

// =========================
// 🔗 MongoDB Connection
// =========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error:", err));

// =========================
// 🧪 TEST
// =========================
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

// =========================
// 👤 REGISTER
// =========================
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.json({ message: "User already exists ❌" });

    const user = new User({ name, email, password });
    await user.save();

    res.json({ message: "Registered successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: "Server error ❌" });
  }
});

// =========================
// 🔐 LOGIN
// =========================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.json({ message: "Invalid email or password ❌" });
    }

    res.json({ message: "Login successful ✅", user });
  } catch (err) {
    res.status(500).json({ message: "Server error ❌" });
  }
});

/// ADD TO CART
app.post("/api/cart", async (req, res) => {
  try {
    const { userEmail, car } = req.body;

    let userCart = await Cart.findOne({ userEmail });

    if (!userCart) {
      userCart = new Cart({ userEmail, cart: [car] });
    } else {
      userCart.cart.push(car);
    }

    await userCart.save();
    res.json({ message: "Added to cart ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error ❌" });
  }
});

// GET CART
app.get("/api/cart/:email", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userEmail: req.params.email });
    res.json(cart ? cart.cart : []);
  } catch (err) {
    res.status(500).json({ message: "Error ❌" });
  }
});

// DELETE FROM CART
app.delete("/api/cart/:email/:index", async (req, res) => {
  try {
    const { email, index } = req.params;

    const userCart = await Cart.findOne({ userEmail: email });

    if (!userCart) return res.json({ message: "Cart not found" });

    // 🔥 remove using index
    userCart.cart.splice(index, 1);

    await userCart.save();

    res.json({ message: "Removed successfully ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error ❌" });
  }
});

// app.delete("/api/cart/:email/clear", async (req, res) => {
//   const { email } = req.params;

//   await Cart.updateOne(
//     { userEmail: email },
//     { $set: { cart: [] } }
//   );

//   res.json({ message: "Cart cleared" });
// });

// ADD TO WISHLIST
app.post("/api/wishlist", async (req, res) => {
  try {
    const { userEmail, car } = req.body;

    let userWishlist = await Wishlist.findOne({ userEmail });

    if (!userWishlist) {
      userWishlist = new Wishlist({ userEmail, wishlist: [car] });
    } else {
      userWishlist.wishlist.push(car);
    }

    await userWishlist.save();
    res.json({ message: "Added to wishlist ❤️" });
  } catch (err) {
    res.status(500).json({ message: "Error ❌" });
  }
});

// GET WISHLIST
app.get("/api/wishlist/:email", async (req, res) => {
  try {
    const data = await Wishlist.findOne({ userEmail: req.params.email });
    res.json(data ? data.wishlist : []);
  } catch (err) {
    res.status(500).json({ message: "Error ❌" });
  }
});

app.delete("/api/wishlist/:email/:index", async (req, res) => {
  try {
    const { email, index } = req.params;

    const data = await Wishlist.findOne({ userEmail: email });

    if (!data) return res.json({ message: "Wishlist not found" });

    data.wishlist.splice(index, 1);

    await data.save();

    res.json({ message: "Removed successfully ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error ❌" });
  }
});
// =========================
// 🚀 SERVER START
// =========================
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});