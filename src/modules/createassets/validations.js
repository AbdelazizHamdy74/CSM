const Joi = require("joi");

exports.createAssetSchema = Joi.object({
  asset_name: Joi.string().max(255).required(),
  serial_number: Joi.string()
    .pattern(/^[0-9]+$/)
    .max(20)
    .required(),
  description: Joi.string().max(255).optional().allow(null),
  supported: Joi.alternatives() // Accept both boolean and integer for 'supported'
    .try(Joi.boolean(), Joi.number().valid(1, 0))
    .required(),
  status: Joi.string()
    .required()
    .valid("New", "In Inventory", "Deployed", "Decommissioned"),
  priority: Joi.string().required().valid("High", "Medium", "Low"),
  asset_type: Joi.string().required().valid("Hardware", "Software"),
  user_id: Joi.string().uuid().required(),
  contract_id: Joi.string().uuid().required(),
  product_category_id: Joi.string().uuid().required(),
  product_sub_category_id: Joi.string().uuid().required(),
  company_id: Joi.string().uuid().required(),
  asset_site_id: Joi.string().uuid().required(),
  service_id: Joi.string().uuid().required(),
  notes_id: Joi.string().uuid().optional().allow(null),
});

exports.updateAssetSchema = Joi.object({
  asset_name: Joi.string().max(255).optional(),
  serial_number: Joi.string()
    .pattern(/^[0-9]+$/)
    .max(20)
    .optional(),
  description: Joi.string().max(255).optional().allow(null),
  supported: Joi.alternatives() // Accept both boolean and integer for 'supported'
    .try(Joi.boolean(), Joi.number().valid(1, 0))
    .optional(),
  status: Joi.string()
    .optional()
    .valid("New", "In Inventory", "Deployed", "Decommissioned"),
  priority: Joi.string().optional().valid("High", "Medium", "Low"),
  asset_type: Joi.string().optional().valid("Hardware", "Software"),
  user_id: Joi.string().uuid().optional(),
  contract_id: Joi.string().uuid().optional(),
  product_category_id: Joi.string().uuid().optional(),
  product_sub_category_id: Joi.string().uuid().optional(),
  company_id: Joi.string().uuid().optional(),
  asset_site_id: Joi.string().uuid().optional(),
  service_id: Joi.string().uuid().optional(),
  notes_id: Joi.string().uuid().allow(null),
  isDeleted: Joi.alternatives() // Accept both boolean and integer for 'supported'
    .try(Joi.boolean(), Joi.number().valid(1, 0))
    .optional(),
});
