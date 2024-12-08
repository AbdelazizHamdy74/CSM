const asyncHandler = require("express-async-handler");
const knex = require("../../db");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
//----------------------------------------------------------------
//1 using DiskStorage
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // cb(null, "/uploads/assets");
//     cb(null, path.join(__dirname, "..", "..", "uploads/assets"));
//   },
//   filename: function (req, file, cb) {
//     // console.log("file is :::", file);

//     const extention = file.mimetype.split("/")[1];
//     const fieldname = `asset${Math.round(
//       Math.random() * 1e9
//     )}-${Date.now()}.${extention}`;
//     cb(null, fieldname);
//   },
// });

//2 using MemoryStorage
const multerStorage = multer.memoryStorage();

//Allow only image
const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only image files are allowed!"));
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadAssetImage = upload.single("attach_image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    // if user doesn't attach a file then pass to the next
    return next();
  }
  const fielname = `asset${Math.round(Math.random() * 1e9)}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(20, 20)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/assets/${fielname}`);
  // save the image in the DB
  req.body.attach_image = fielname;
  next();
});
// Create Asset
exports.createAsset = asyncHandler(async (req, res) => {
  const {
    productCategoryName,
    productSubCategoryName,
    serviceName,
    isDeleted = false,
    ...assetData
  } = req.body;

  // find names related by id's
  const productCategory = await knex("product_category")
    .where({ name: productCategoryName })
    .first();
  if (!productCategory) {
    return res.status(400).json({ message: "Invalid product category name" });
  }

  const productSubCategory = await knex("product_sub_category")
    .where({ name: productSubCategoryName })
    .first();
  if (!productSubCategory) {
    return res
      .status(400)
      .json({ message: "Invalid product sub-category name" });
  }

  const service = await knex("service").where({ name: serviceName }).first();
  if (!service) {
    return res.status(400).json({ message: "Invalid service name" });
  }

  // إنشاء معرّفات جديدة لـ asset
  const assetId = uuidv4();
  const timestamp = new Date().getTime();
  const newGuiId = `AS${timestamp}`;

  const newAssetData = {
    id: assetId,
    guiId: newGuiId,
    product_category_id: productCategory.id,
    product_sub_category_id: productSubCategory.id,
    service_id: service.id,
    ...assetData,
  };
  // if user attach image then add atribute attach_image
  if (req.body.attach_image) {
    newAssetData.attach_image = req.body.attach_image;
  }

  // إدخال البيانات في جدول assets
  const newAsset = await knex("assets").insert(newAssetData).returning("*");

  res.status(201).json({ message: "Asset created successfully", newAsset });
});
// Get All Assets
exports.getAllAssets = asyncHandler(async (req, res) => {
  //asset_type, asset_name, hrId, status, serial_number
  const {
    skip = 0,
    limit,
    asset_name,
    asset_type,
    status,
    serial_number,
    hrId,
  } = req.query;

  let query = knex("assets")
    .select(
      "assets.id",
      "assets.guiId",
      "assets.asset_name",
      "assets.serial_number",
      "assets.asset_type",
      "assets.status",
      "assets.priority",
      "assets.isDeleted",
      "assets.description",
      "assets.attach_image",
      "product_category.name as product_category_name",
      "product_sub_category.name as product_sub_category_name",
      "service.name as service_name",
      "assets.created_at",
      "assets.updated_at"
    )
    .leftJoin(
      "product_category",
      "assets.product_category_id",
      "product_category.id"
    )
    .leftJoin(
      "product_sub_category",
      "assets.product_sub_category_id",
      "product_sub_category.id"
    )
    .leftJoin("service", "assets.service_id", "service.id")
    .where("assets.isDeleted", false);

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
// Update Asset
exports.updateAsset = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let updates = { ...req.body };

  console.log("Request body:", req.body);

  //  convert `supported` to Boolean
  if (updates.supported !== undefined) {
    updates.supported =
      updates.supported === "true" || updates.supported === true ? 1 : 0;
  }

  // Convert the datetime fields to MySQL format if they exist
  if (updates.created_at) {
    updates.created_at = new Date(updates.created_at)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  }
  if (updates.updated_at) {
    updates.updated_at = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // updated_at outomatic updated
  } else {
    updates.updated_at = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  }
  try {
    const updated = await knex("assets").where({ id }).update(updates);

    if (updated) {
      res
        .status(200)
        .json({ success: true, message: "Asset updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Asset not found" });
    }
  } catch (error) {
    console.error("Error updating asset:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
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
// Get Deleted Assets
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

// const generateRandomSerialNumber = async () => {
//   let serialNumber;
//   let exists = true;
//   while (exists) {
//     serialNumber = Math.floor(1000000 + Math.random() * 9000000).toString();
//     exists = await knex("assets")
//       .where({ serial_number: serialNumber })
//       .first();
//   }
//   return serialNumber;
// };
