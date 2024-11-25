const Joi = require("joi");

//validate get All Assets
exports.validateGetAllAssets = Joi.object({
  skip: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(1).max(100),
  asset_name: Joi.string().max(255),
  asset_type: Joi.string().valid("Hardware", "Software"),
  status: Joi.string().valid(
    "New",
    "In Inventory",
    "Deployed",
    "Decommissioned"
  ),
  serial_number: Joi.string().max(255),
  //   hrId: Joi.string().uuid(),
  hrId: Joi.string(),
  priority: Joi.string().valid("High", "Medium", "Low"),
});
