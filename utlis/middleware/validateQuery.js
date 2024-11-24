exports.validateQuery = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
};
