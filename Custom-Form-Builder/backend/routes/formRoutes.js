const express = require("express");
const Form = require("../models/Form");
const router = express.Router();

// Create a new form
router.post("/", async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.json(form);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get form by ID
router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ error: "Form not found" });
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const { upload } = require("../config/cloudinary");

// Upload single image (for header or question)
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({ imageUrl: req.file.path }); // Cloudinary returns URL in path
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
