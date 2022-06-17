const userService = require("./user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthService {
  userService;
  constructor(userService) {
    this.userService = userService;
  }

  async signup(email, password) {
    const hashPass = await bcrypt.hash(password, 6);
    const {
      email: newUserEmail,
      subscription,
      avatarUrl,
    } = await this.userService.createUser({
      email,
      password: hashPass,
    });

    return { email: newUserEmail, subscription, avatarUrl };
  }

  async signin(id) {
    const payload = { id };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const { email, subscription } = await this.userService.updateUser({ id, token });

    return {
      token,
      user: { email, subscription },
    };
  }

  async logout(req, res) {
    const { id } = req.user;
    await this.userService.updateUser({ id, token: null });

    res.status(204).send();
  }
}

const authService = new AuthService(userService);
module.exports = authService;
