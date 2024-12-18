// routes/assetRoutes.js
const express = require("express");

const {
  getAllAssets,
  createAsset,
  deleteAsset,
  getAssetById,
  updateAsset,
  getAssetsByContractId,
  uploadAssetImage,
  resizeImage,
} = require("./assetController");
const { validateQuery } = require("../../utlis/middleware/validateQuery");

const { validateGetAllAssets } = require("./assetValidation");

const router = express.Router();
router
  .route("/")
  .get(validateQuery(validateGetAllAssets), getAllAssets)
  .post(uploadAssetImage, resizeImage, createAsset);

router
  .route("/:id")
  .put(uploadAssetImage, resizeImage, updateAsset)
  .get(getAssetById)
  .delete(deleteAsset);

router.get("/by-contract/:contractId", getAssetsByContractId);
module.exports = router;
