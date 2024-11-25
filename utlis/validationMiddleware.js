const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    // Map Joi validation errors to readable format
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ message: "Validation error", errors });
  }

  next();
};

module.exports = validate;
