const userService = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthController {
  userService;
  constructor(userService) {
    this.userService = userService;
  }

  async signup(req, res) {
    const { email, password } = req.body;
    const existUser = await this.userService.getUserByEmail(email);

    if (existUser) return res.status(409).send({ message: "Email in use" });

    const hashPass = await bcrypt.hash(password, 6);
    const newUser = await this.userService.createUser({
      email,
      password: hashPass,
    });

    res
      .status(201)
      .send({ email: newUser.email, subscription: newUser.subscription });
  }

  async signin(req, res) {
    const { email, password } = req.body;
    const user = await this.userService.getUserByEmail(email);

    if (!user) return res.status(401).send({ message: "Invalid Credentials" });

    const isVallidPAss = await bcrypt.compare(password, user.password);

    if (!isVallidPAss)
      return res.status(401).send({ message: "Invalid Credentials" });

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    await this.userService.updateUser({id: user.id, token})

    res
      .status(200)
      .send({
        token,
        user: { email: user.email, subscription: user.subscription },
      });
  }
}

const authController = new AuthController(userService);
module.exports = authController;
