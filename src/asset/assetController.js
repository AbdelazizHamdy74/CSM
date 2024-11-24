const asyncHandler = require("express-async-handler");
const knex = require("../../db");
const { v4: uuidv4 } = require("uuid");

// Create Asset
exports.createAsset = asyncHandler(async (req, res) => {
  const assetId = uuidv4();

  const timestamp = new Date().getTime();
  const newGuiId = `AS${timestamp}`;

  const newAssetData = {
    id: assetId,
    guiId: newGuiId,
    ...req.body,
  };
  const newAsset = await knex("assets").insert(newAssetData).returning("*");

  res.status(201).json({ message: " Asset created ", newAsset });
});

//----------------------------------------------------------------
// Get All Assets
exports.getAllAssets = asyncHandler(async (req, res) => {
  // search by  asset_type, asset_name, hrId, status, serial_number
  const {
    skip = 0,
    limit = 6, //
    asset_name,
    asset_type,
    status,
    serial_number,
    hrId,
  } = req.query;

  let query = knex("assets").select("*").where({ isDeleted: false });

  if (asset_name)
    query = query.andWhere("asset_name", "like", `%${asset_name}%`);
  if (asset_type) query = query.andWhere("asset_type", asset_type);
  if (status) query = query.andWhere("status", status);
  if (serial_number) query = query.andWhere("serial_number", serial_number);
  if (hrId) {
    query.andWhere("user_id", function () {
      this.select("id").from("users").where("HrId", hrId);
    });
  }

  const assets = await query.offset(Number(skip)).limit(Number(limit));

  res.status(200).json({
    success: true,
    "Number of assets:": assets.length,
    data: assets,
  });
});

exports.getAllDeletedAssets = asyncHandler(async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;
  const assets = await knex("assets")
    .select("*")
    .where({ isDeleted: true })
    .offset(Number(skip))
    .limit(Number(limit));
  res
    .status(200)
    .json({ success: true, "Number of assets:": assets.length, data: assets });
});

// exports.searchAssets = asyncHandler(async (req, res) => {
//   const { asset_type, asset_name, hrId, status, serial_number } = req.query;

//   const query = knex("assets").where({ isDeleted: false });

//   if (asset_type) query.andWhere("asset_type", asset_type);
//   if (asset_name) query.andWhere("asset_name", "like", `%${asset_name}%`); // % represent string
//   // if (asset_name) query.andWhere("asset_name", "like", `_${asset_name}_`);  // _ represent singleLitter
//   if (hrId) {
//     query.andWhere("user_id", function () {
//       this.select("id").from("users").where("HrId", hrId);
//     });
//   }
//   if (status) query.andWhere("status", status);
//   if (serial_number) query.andWhere("serial_number", serial_number);

//   if (!asset_type && !asset_name && !hrId && !status && !serial_number) {
//     return res.status(400).json({
//       success: false,
//       error: "No search criteria provided",
//     });
//   }
//   const results = await query;

//   if (results.length === 0) {
//     return res.status(404).json({ success: false, error: "No assets found" });
//   }
//   res
//     .status(200)
//     .json({ success: true, "Number of assets": results.length, data: results });
// });

// exports.getAllAssets = asyncHandler(async (req, res) => {
//   const { skip = 0, limit = 5 } = req.query;
//   const assets = await knex("assets")
//     .select("*")
//     .where({ isDeleted: false })
//     .offset(Number(skip))
//     .limit(Number(limit));
//   res
//     .status(200)
//     .json({ success: true, "Number of assets:": assets.length, data: assets });
// });
//----------------------------------------------------------------

// Get Single Asset
exports.getAssetById = asyncHandler(async (req, res) => {
  const asset = await knex("assets")
    .where({ id: req.params.id, isDeleted: false })
    .first();
  if (asset) {
    res.json(asset);
  } else {
    res.status(404).json({ error: "Asset not found" });
  }
});

// Update Asset
exports.updateAsset = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const asset = await knex("assets").where({ id }).first();
  if (!asset) {
    return res.status(404).json({ message: "asset not found" });
  }
  if (asset.isDeleted) {
    return res.status(403).json({ message: "asset is deleted, cannot update" });
  }
  const updatedAsset = await knex("assets")
    .where({ id })
    .update(req.body)
    .returning("*");

  res.status(200).json(updatedAsset);
});

// Delete Asset (Soft Delete)
exports.deleteAsset = asyncHandler(async (req, res) => {
  const updated = await knex("assets")
    .where({ id: req.params.id })
    .update({ isDeleted: true });
  if (updated) {
    res.json({ message: "Asset deleted successfully" });
  } else {
    res.status(404).json({ error: "Asset not found" });
  }
});
