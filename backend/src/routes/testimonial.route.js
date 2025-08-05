// routes/testimonials.js
import express from "express";
import Testimonials from "../models/testimonials.model.js";
import Messages from "../models/message.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const testimonial = new Testimonials(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonials.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/send-message", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email) {
      return res.status(500).json({ message: "Name Or Email is Required" });
    }

    const newMessage = new Messages({
      name,
      email,
      message,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/messages", async (req, res) => {
  try {
    const messages = await Messages.find();
    if (messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
