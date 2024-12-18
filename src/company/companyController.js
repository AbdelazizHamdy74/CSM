const asyncHandler = require("express-async-handler");
const knex = require("../../db");
const { v4: uuidv4 } = require("uuid");

exports.createCompany = asyncHandler(async (req, res) => {
  const companyId = uuidv4();
  const newCompanyData = {
    id: companyId,
    name: req.body.name,
    isDeleted: req.body.isDeleted || false,
  };

  const newCompany = await knex("company")
    .insert(newCompanyData)
    .returning("*");

  console.log(newCompany);
  res.status(201).json({
    message: "Company created successfully",
    newCompany,
  });
});
//get company by id
exports.getCompanyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const company = await knex("company")
    .where({ id })
    .first()
    .where({ isDeleted: false });
  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }
  res.status(200).json(company);
});
// get all companies
exports.getCompanies = asyncHandler(async (req, res) => {
  const companies = await knex("company")
    .select("*")
    .where({ isDeleted: false });
  res.status(200).json({
    message: "All Companies",
    "companies Number": companies.length,
    companies,
  });
});
// get deleted companies
exports.getDeletedCompanies = asyncHandler(async (req, res) => {
  const companies = await knex("company")
    .select("*")
    .where({ isDeleted: true });
  res.status(200).json({
    message: "All deleted Companies",
    "companies Number": companies.length,
    companies,
  });
});

exports.updateCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedCompany = await knex("company")
    .where({ id })
    .update(req.body)
    .returning("*");
  res
    .status(200)
    .json({ message: "Company updated successfully", updatedCompany });
});

exports.deleteCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteCom = await knex("company")
    .where({ id })
    .update({ isDeleted: true });

  if (deleteCom) {
    res.status(204).json({ message: "Company deleted successfully" });
  } else {
    res.status(404).json({ error: "Company not found" });
  }
});
