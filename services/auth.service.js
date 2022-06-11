const userService = require("../services/user.service");
const bcrypt = require("bcrypt");

class AuthService {
  userService;
  constructor(userService) {
    this.userService = userService;
  }

  async signup(email) {
    const existUser = await this.userService.getUserByEmail(email);

    if (existUser) return { message: "Email in use" };

    const hashPass = await bcrypt.hash(body.password, 6);
    const newUser =  await User.create({ ...body, password: hashPass });

    return { email: newUser.email, subscription: newUser.subscription };
  }

  async signin(req, res) {
    const { email, password } = req.body;
    const user = await this.userService.getUserByEmail(email);

    if (!user) return res.status(403).send({ message: "Invalid Credentials" });

    const isVallidPAss = await bcrypt.compare(password, user.password);

    if (!isVallidPAss) return res.status(403).send({ message: "Invalid Credentials" });

    // res.status(201).send(newUser);
  }
}

const authService = new AuthService(userService);
module.exports = authService;
