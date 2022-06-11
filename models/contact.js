const { model, Schema } = require("mongoose");
const Joi = require("joi");

const contactShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  },
  { versionKey: false, timestamps: true }
);

const shemaJoiCreate = Joi.object().keys({
  name: Joi.string().min(3).required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

const shemaJoiUpdate = Joi.object().keys({
  name: Joi.string().min(3),
  phone: Joi.string(),
  email: Joi.string().email(),
});

const shemaJoiFavorite = Joi.object().keys({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactShema);

module.exports = { Contact, shemaJoiCreate, shemaJoiUpdate, shemaJoiFavorite };
