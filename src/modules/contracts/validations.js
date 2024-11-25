const Joi = require("joi");
exports.createContractSchema = Joi.object({
  company_id: Joi.string().uuid().required(),
  service_id: Joi.string().uuid().required(),
  period: Joi.string().max(50).required(),
  status_reason: Joi.string().max(255).optional().allow(null),
  status: Joi.string().required().valid("Active", "Down"),
  notes_id: Joi.string().uuid().allow(null),
});

exports.uodateContractSchema = Joi.object({
  company_id: Joi.string().uuid().optional(),
  service_id: Joi.string().uuid().optional(),
  period: Joi.string().max(50).optional(),
  status_reason: Joi.string().max(255).optional().allow(null),
  status: Joi.string().required().valid("Active", "Down"),
  notes_id: Joi.string().uuid().allow(null),
});
