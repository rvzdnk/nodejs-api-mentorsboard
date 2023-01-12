const Joi = require("joi");

const schemaCreationOrEditing = Joi.object({
    technology: Joi.string().trim(),
    level: Joi.string().trim(),
    price: Joi.number().trim(),
});

const validation = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const [{ message }] = error.details;
    return res.status(400).json({
      message: message.replace(/"/g, ""),
    });
  }
  next();
};

const validateCreationOrEditing = (req, res, next) =>
  validation(schemaCreationOrEditing, req, res, next);

module.exports = {
  validateCreationOrEditing,
};