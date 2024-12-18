const asyncHandler = require("express-async-handler");
const knex = require("../../db");
const { v4: uuidv4 } = require("uuid");

exports.createContract = asyncHandler(async (req, res) => {
  const { company, service, notes, ...rest } = req.body;

  //search for company id depending on its name
  const companyData = await knex("company")
    .select("id")
    .where({ name: company })
    .first();
  if (!companyData) {
    return res.status(400).json({ message: "Invalid company name" });
  }

  //search for service id depending on its name
  let serviceData = null;
  if (service) {
    serviceData = await knex("service")
      .select("id")
      .where({ name: service })
      .first();
    if (!serviceData) {
      return res.status(400).json({ message: "Invalid service name" });
    }
  }

  //search for note id depending on text
  let notesData = null;
  if (notes) {
    notesData = await knex("notes").select("id").where({ text: notes }).first();
    if (!notesData) {
      return res.status(400).json({ message: "Invalid notes content" });
    }
  }

  const newContractData = {
    ...rest,
    id: uuidv4(),
    guiId: Math.floor(10000 + Math.random() * 90000).toString(),
    company_id: companyData.id,
    service_id: serviceData?.id || null,
    notes_id: notesData?.id || null,
  };

  const [newContract] = await knex("contracts")
    .insert(newContractData)
    .returning("*");
  res.status(201).json({
    ...newContract,
    company,
    service: service || null,
    notes: notes || null,
  });
});

// exports.getContracts = asyncHandler(async (req, res) => {
//   const contracts = await knex("contracts")
//     .select(
//       "contracts.id",
//       "contracts.guiId",
//       "contracts.period",
//       "contracts.status",
//       "contracts.status_reason",
//       "contracts.isDeleted",
//       "contracts.created_at",
//       "contracts.updated_at",
//       "company.name as company",
//       "service.name as service",
//       "notes.text as notes"
//     )
//     .where({ "contracts.isDeleted": false })
//     .leftJoin("company", "contracts.company_id", "company.id")
//     .leftJoin("service", "contracts.service_id", "service.id")
//     .leftJoin("notes", "contracts.notes_id", "notes.id");

//   res
//     .status(200)
//     .json({ "Number of contracts: ": contracts.length, contracts });
// });
exports.getContracts = asyncHandler(async (req, res) => {
  const contracts = await knex("contracts")
    .select([
      "contracts.id",
      "contracts.guiId",
      "contracts.period",
      "contracts.status",
      "contracts.status_reason",
      "contracts.isDeleted",
      "contracts.created_at",
      "contracts.updated_at",
      "company.name as company",
      "service.name as service",
      "notes.text as notes",
    ])
    .leftJoin("company", "contracts.company_id", "company.id")
    .leftJoin("service", "contracts.service_id", "service.id")
    .leftJoin("notes", "contracts.notes_id", "notes.id")
    .where({ "contracts.isDeleted": false });

  res
    .status(200)
    .json({ "Number of contracts: ": contracts.length, contracts });
});

// exports.getContractById = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const contract = await knex("contracts")
//     .select(
//       "contracts.id",
//       "contracts.guiId",
//       "contracts.period",
//       "contracts.status",
//       "contracts.status_reason",
//       "contracts.isDeleted",
//       "contracts.created_at",
//       "contracts.updated_at",
//       "company.name as company",
//       "service.name as service",
//       "notes.text as notes"
//     )
//     .where({ "contracts.id": id, "contracts.isDeleted": false })
//     .leftJoin("company", "contracts.company_id", "company.id")
//     .leftJoin("service", "contracts.service_id", "service.id")
//     .leftJoin("notes", "contracts.notes_id", "notes.id")
//     .first();

//   if (!contract) {
//     return res.status(404).json({ message: "Contract not found or deleted" });
//   }
//   res.status(200).json(contract);
// });
exports.getContractById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const contract = await knex("contracts")
    .select([
      "contracts.*",
      "company.name as company",
      "service.name as service",
      "notes.text as notes",
    ])
    .leftJoin("company", "contracts.company_id", "company.id")
    .leftJoin("service", "contracts.service_id", "service.id")
    .leftJoin("notes", "contracts.notes_id", "notes.id")
    .where("contracts.id", id)
    .first();

  if (!contract) {
    return res.status(404).json({ message: "Contract not found" });
  }

  res.status(200).json(contract);
});

// exports.updateContract = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const Contract = await knex("contracts").where({ id }).first();
//   if (!Contract) {
//     returtatus(404).json({ message: "Contract not found" });
//   }
//   if (Contract.isDeleted) {
//     return res
//       .status(403)
//       .json({ message: "Contract is deleted, cannot update" });
//   }
//   const updatedContract = await knex("contracts")
//     .where({ id })
//     .update(req.body)
//     .returning("*");
//   res.status(200).json(updatedContract);
// });
exports.updateContract = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { company, service, notes, ...rest } = req.body;

  // Check if contract exists
  const existingContract = await knex("contracts").where({ id }).first();
  if (!existingContract) {
    return res.status(404).json({ message: "Contract not found" });
  }

  // Search for company id based on its name
  let companyData = null;
  if (company) {
    companyData = await knex("company")
      .select("id")
      .where({ name: company })
      .first();
    if (!companyData) {
      return res.status(400).json({ message: "Invalid company name" });
    }
  }

  // Search for service id based on its name
  let serviceData = null;
  if (service) {
    serviceData = await knex("service")
      .select("id")
      .where({ name: service })
      .first();
    if (!serviceData) {
      return res.status(400).json({ message: "Invalid service name" });
    }
  }

  // Search for notes id based on text
  let notesData = null;
  if (notes) {
    notesData = await knex("notes").select("id").where({ text: notes }).first();
    if (!notesData) {
      return res.status(400).json({ message: "Invalid notes content" });
    }
  }

  // Prepare updated data
  const updatedContractData = {
    ...rest,
    company_id: companyData?.id || existingContract.company_id,
    service_id: serviceData?.id || existingContract.service_id,
    notes_id: notesData?.id || existingContract.notes_id,
  };

  // Update contract
  await knex("contracts").where({ id }).update(updatedContractData);

  // Fetch updated contract
  const updatedContract = await knex("contracts")
    .select([
      "contracts.*",
      "company.name as company",
      "service.name as service",
      "notes.text as notes",
    ])
    .leftJoin("company", "contracts.company_id", "company.id")
    .leftJoin("service", "contracts.service_id", "service.id")
    .leftJoin("notes", "contracts.notes_id", "notes.id")
    .where("contracts.id", id)
    .first();

  res.status(200).json(updatedContract);
});

exports.getDeleteContracts = asyncHandler(async (req, res) => {
  const contracts = await knex("contracts")
    .select("*")
    .where({ isDeleted: true });
  res.json(contracts);
});

exports.deleteContract = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // await knex("contracts").where({ id }).del();
  await knex("contracts").where({ id }).update({ isDeleted: true });
  res.status(204).send();
});
