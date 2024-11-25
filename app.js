const express = require("express");
const cookieParser = require("cookie-parser");
const assetRoutes = require("./src/modules/createassets/route");
const contractRoute = require("./src/modules/contracts/route");
const notesRoute = require("./src/modules/notes/route");
const getAssetRoutes = require("./src/modules/asset/assetRoute");

const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/aitb/assets", assetRoutes);
app.use("/api/aitb/notes", notesRoute);
app.use("/api/aitb/getassets", getAssetRoutes);
app.use("/api/aitb/contracts", contractRoute);

module.exports = app;
