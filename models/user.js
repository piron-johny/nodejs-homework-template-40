const { model, Schema } = require("mongoose");
const Joi = require("joi");
const gravatar = require("gravatar");

const userShema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: () => gravatar.url(this.email, {}, true),
    },
  },
  { versionKey: false, timestamps: true }
);

const shemaJoiCreate = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  // avatarUrl: Joi.
});

const shemaJoiUpdateSubscription = Joi.object().keys({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const User = model("user", userShema);

module.exports = { User, shemaJoiCreate, shemaJoiUpdateSubscription };
