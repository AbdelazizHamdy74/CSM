const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// إعداد CORS
const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "PUT", "POST"],
  credentials: true,
};

// استخدام CORS
app.use(cors(corsOptions));

// Import Routes
const assetRoutes = require("./src/asset/assetRoute");

// Use Routes
app.use("/api/assets", assetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
