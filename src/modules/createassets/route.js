const express = require("express");
const assetController = require("./controller");
const upload = require("../../../utils/uploadPhotoMiddleware");
const validate = require("../../../utlis/validationMiddleware");
const { createAssetSchema, updateAssetSchema } = require("./validations");
const router = express.Router();

router.post(
  "/create-asset",
  upload.single("photo"),
  validate(createAssetSchema), // Validate asset before processing the creation
  assetController.addAsset
);

router.patch(
  "/update-asset/:assetId",
  upload.single("photo"),
  validate(updateAssetSchema), // Validate asset before processing the creation
  assetController.updateAsset
);

module.exports = router;
