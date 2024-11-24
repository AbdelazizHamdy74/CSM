// routes/assetRoutes.js
const express = require("express");

const { getAllAssets, deleteAsset } = require("./assetController");
const { validateQuery } = require("../../utlis/middleware/validateQuery");

const { validateGetAllAssets } = require("./assetValidation");

const router = express.Router();
router.route("/").get(validateQuery(validateGetAllAssets), getAllAssets);

router.route("/:id").delete(deleteAsset);

module.exports = router;
