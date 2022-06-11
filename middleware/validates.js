const checkRequest = () => async (req, res, next) => {
  const body = req.body;

  if (Object.keys(body).length === 0)
    return res.status(400).send({ message: "missing fields" });

  next();
};

const validate = (schema) => async (req, res, next) => {
  const contact = req.body;
  const { error } = schema.validate(contact);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { checkRequest, validate };
