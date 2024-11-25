const express = require("express");
const contractController = require("./controller");
const validate = require("../../../utlis/validationMiddleware");
const { createContractSchema, uodateContractSchema } = require("./validations");
const router = express.Router();
router.post(
  "/create-contract",
  validate(createContractSchema),
  contractController.createContract
);
router.patch(
  "/update-contract/:contractId",
  validate(uodateContractSchema),
  contractController.updateContract
);

module.exports = router;
