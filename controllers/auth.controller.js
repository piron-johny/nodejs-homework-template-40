const userService = require("../services/user.service");
const authService = require("../services/auth.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
require("dotenv").config();

class AuthController {
  userService;
  authService;
  constructor(userService, authService) {
    this.userService = userService;
    this.authService = authService;
  }

  async signup(req, res) {
    const { email, password } = req.body;
    const existUser = await this.userService.getUserByEmail(email);

    if (existUser) return res.status(409).send({ message: "Email in use" });

    const newUser = await this.authService.signup(email, password);

    res.status(201).send(newUser);
  }

  async signin(req, res) {
    const { email, password } = req.body;
    const user = await this.userService.getUserByEmail(email);

    if (!user) return res.status(401).send({ message: "Invalid Credentials" });

    const isVallidPAss = await bcrypt.compare(password, user.password);

    if (!isVallidPAss)
      return res.status(401).send({ message: "Invalid Credentials" });

    const userResponse = await this.authService.signin(user.id)

    res.status(200).send(userResponse);
  }

  async logout(req, res) {
    const { id } = req.user;
    await this.userService.updateUser({ id, token: null });

    res.status(204).send();
  }
}

const authController = new AuthController(userService, authService);
module.exports = authController;
