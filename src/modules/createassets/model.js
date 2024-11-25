const knex = require("../../../db/knex");
// const generateUniqueId = require("../../utils/generateUniqueId");
const { v4: uuidv4 } = require("uuid");
const generateGuiId = require("../../../utlis/generateGuiid");

exports.addAsset = async (
  asset_name,
  serial_number,
  supported,
  status,
  priority,
  attach_image,
  description,
  asset_type,
  user_id,
  contract_id,
  product_category_id,
  product_sub_category_id,
  company_id,
  asset_site_id,
  service_id,
  notes_id
) => {
  const guiId = await generateGuiId("assets", "ASSET");
  // Insert the new asset
  await knex("assets").insert({
    id: uuidv4(),
    guiId: guiId,
    asset_name,
    serial_number,
    supported,
    status,
    priority,
    attach_image,
    description,
    asset_type,
    user_id,
    contract_id,
    product_category_id,
    product_sub_category_id,
    company_id,
    asset_site_id,
    service_id,
    notes_id,
    isDeleted: false,
  });

  // Select and return the newly added asset
  const newAsset = await knex("assets")
    .select(
      "id",
      "guiId",
      "asset_name",
      "serial_number",
      "supported",
      "status",
      "priority",
      "attach_image",
      "description",
      "asset_type",
      "user_id",
      "contract_id",
      "product_category_id",
      "product_sub_category_id",
      "company_id",
      "asset_site_id",
      "service_id",
      "notes_id"
    )
    .where({ serial_number })
    .first();

  return newAsset;
};

exports.updateAsset = async (
  assetId,
  supported,
  status,
  priority,
  attach_image,
  description,
  user_id,
  contract_id,
  product_category_id,
  product_sub_category_id,
  company_id,
  asset_site_id,
  service_id,
  notes_id,
  isDeleted
) => {
  // Prepare the update object, excluding asset_type , asset_name and serial_number
  const updateData = {
    supported,
    status,
    priority,
    attach_image,
    description,
    user_id,
    contract_id,
    product_category_id,
    product_sub_category_id,
    company_id,
    asset_site_id,
    service_id,
    notes_id,
    isDeleted,
  };

  // Perform the update in the database
  await knex("assets")
    .where({ id: assetId }) // Find the asset by its ID
    .update(updateData);

  // Fetch the updated asset and return it
  const updatedAsset = await knex("assets")
    .select(
      "id",
      "guiId",
      "asset_name",
      "serial_number",
      "status",
      "priority",
      "supported",
      "attach_image",
      "description",
      "asset_type",
      "user_id",
      "contract_id",
      "product_category_id",
      "product_sub_category_id",
      "company_id",
      "asset_site_id",
      "service_id",
      "notes_id",
      "isDeleted"
    )
    .where({ id: assetId }) // Retrieve the asset based on its ID
    .first(); // Return the updated asset

  return updatedAsset;
};

// Utility function for selecting data
exports.select = async (table, columns, whereClause) => {
  return await knex(table).select(columns).where(whereClause).first();
};
// Utility function to check for duplicate serial number
exports.isSerialNumberDuplicate = async (serialNumber) => {
  const asset = await knex("assets")
    .select("*")
    .where({ serial_number: serialNumber })
    .first();
  return !!asset; // Returns true if the serial number exists, false otherwise
};
