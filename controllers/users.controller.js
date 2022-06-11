const userService = require("../services/user.service");

class UserController {
  userService;
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res) {
    const user = req.body;
    const newUser = await this.userService.createUser(user);

    res.status(201).send(newUser);
  }

  async getUserById(req, res) {
    const { userId } = req.params;
    const user = await this.userService.getUserById(userId);

    if (!user) res.status(404).send({ message: "Not found" });

    res.status(200).send(user);
  }

  async deleteUser(req, res) {
    const { userId } = req.params;
    const existUser = await this.userService.getUserById(userId);

    if (!existUser) return res.status(404).send({ message: "Not found" });

    await this.userService.removeUser(existUser.id);

    res.status(200).send({ message: "contact deleted" });
  }

}

const userController = new UserController(userService);
module.exports = userController;
