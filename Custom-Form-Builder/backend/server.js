const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const formRoutes = require("./routes/formRoutes");
const responseRoutes = require("./routes/responseRoutes");

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON body

// API Routes
app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, )
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log("❌ MongoDB Connection Error:", err));
