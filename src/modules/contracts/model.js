const knex = require("../../../db/knex");
const { v4: uuidv4 } = require("uuid");
const generateGuiId = require("../../../utlis/generateGuiid");

exports.createContract = async (
  company_id,
  service_id,
  notes_id,
  period,
  status,
  status_reason
) => {
  const guiId = await generateGuiId("contracts", "CONTRACT");
  // Insert the new asset
  await knex("contracts").insert({
    id: uuidv4(),
    guiId: guiId,
    company_id,
    service_id,
    notes_id,
    period,
    status,
    status_reason,
    isDeleted: false,
  });

  // Select and return the newly added asset
  const newContract = await knex("contracts")
    .select(
      "id",
      "guiId",
      "company_id",
      "service_id",
      "notes_id",
      "period",
      "status",
      "status_reason"
    )
    .where({ guiId })
    .first();

  return newContract;
};

exports.updateContract = async (contractId, data) => {
  // Perform the update in the database
  await knex("contracts")
    .where({ id: contractId }) // Find the asset by its ID
    .update(data);

  // Fetch the updated asset and return it
  const updatedContract = await knex("contracts")
    .select(
      "id",
      "guiId",
      "company_id",
      "service_id",
      "notes_id",
      "period",
      "status",
      "status_reason"
    )
    .where({ id: contractId }) // Retrieve the asset based on its ID
    .first(); // Return the updated asset

  return updatedContract;
};
exports.select = async (table, columns, whereClause) => {
  return await knex(table).select(columns).where(whereClause).first();
};
