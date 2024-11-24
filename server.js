const express = require("express");

const app = express();

app.use(express.json());
// Import Routes
const assetRoutes = require("./src/asset/assetRoute");

// Use Routes
app.use("/api/assets", assetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
