const { User } = require("../models/user");
const bcrypt = require("bcrypt");

class UserService {
  async getUserById(userId) {
    return await User.findById(userId);
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  async removeUser(userId) {
    return await User.findByIdAndRemove(userId);
  }

  async createUser(body) {
    return await User.create(body);
  }

  async updateUser(body) {
    return await User.findByIdAndUpdate(body.id, { ...body }, { new: true });
  }

  async updateUserAvatar(id, avatarUrl) {
    return await User.findByIdAndUpdate(id, { avatarUrl }, { new: true });
  }
}

const userService = new UserService();
module.exports = userService;
