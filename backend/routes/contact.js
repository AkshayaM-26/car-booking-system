const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// 📩 Send message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMsg = new Contact({ name, email, message });
    await newMsg.save();

    res.json({ message: "Message sent successfully ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to send ❌" });
  }
});

// 📥 Get all messages (Admin)
router.get("/", async (req, res) => {
  try {
    const data = await Contact.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching messages ❌" });
  }
});

// ❌ DELETE message (Admin)
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted ❌" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting message ❌" });
  }
});

module.exports = router;