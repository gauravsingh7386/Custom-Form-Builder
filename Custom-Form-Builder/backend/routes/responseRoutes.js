const express = require("express");
const Response = require("../models/Response");
const router = express.Router();

// Save Response
router.post("/", async (req, res) => {
  try {
    const response = new Response(req.body);
    await response.save();
    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all responses for a form
router.get("/:formId", async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
