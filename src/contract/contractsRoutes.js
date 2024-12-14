const express = require("express");
const router = express.Router();
const {
  createContract,
  getContracts,
  getContractById,
  getDeleteContracts,
  updateContract,
  deleteContract,
} = require("./contractsController");

router.route("/").get(getContracts).post(createContract);
router.route("/delete").get(getDeleteContracts);

router
  .route("/:id")
  .get(getContractById)
  .put(updateContract)
  .delete(deleteContract);

module.exports = router;
