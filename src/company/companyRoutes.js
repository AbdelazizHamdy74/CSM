const express = require("express");
const router = express.Router();
const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getDeletedCompanies,
} = require("./companyController");

router.route("/").get(getCompanies).post(createCompany);
router.route("/deleted").get(getDeletedCompanies);

router
  .route("/:id")
  .get(getCompanyById)
  .put(updateCompany)
  .delete(deleteCompany);

module.exports = router;
