const { User } = require("../models/user");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();

class UserService {
  async getUserById(userId) {
    return await User.findById(userId);
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  async getUserByVerificationToken(verificationToken) {
    return await User.findOne({ verificationToken });
  }

  async removeUser(userId) {
    return await User.findByIdAndRemove(userId);
  }

  async createUser(body) {
    return await User.create(body);
  }

  async updateUser(id, body) {
    console.log("body", body);
    return await User.findByIdAndUpdate(id, body, { new: true });
  }

  async sendVerifyMsg(email, verificationToken) {
    const msg = {
      to: email,
      subject: 'Verify Email',
      html: `<a target="_blank" href="${process.env.DOMAIN_HOST}/api/users/verify/${verificationToken}">Click to verify your Email</a>`,
    }
    await sendEmail(msg);
  }
}

const userService = new UserService();
module.exports = userService;
