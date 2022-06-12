const userService = require("../services/user.service");

class UserController {
  userService;
  constructor(userService) {
    this.userService = userService;
  }

  async getUserById(req, res) {
    const { id } = req.user;
    const user = await this.userService.getUserById(id);

    if (!user) res.status(404).send({ message: "Not found" });

    res.status(200).send(user)
  }

  async getUserByToken(req, res) {
    const { email, id, subscription } = req.user

    res.status(200).send({ email, id, subscription });
  }


  async updateUserSubscription(req, res) {
    const { id } = req.user;
    const { subscription } = req.body;
    const user = await this.userService.updateUser({ id, subscription });

    if (!user) return res.status(404).send({ message: "Not found" });

    res.status(200).send({ message: "user subscription updated" });
  }

  async deleteUser(req, res) {
    const { userId } = req.params;
    const existUser = await this.userService.getUserById(userId);

    if (!existUser) return res.status(404).send({ message: "Not found" });

    await this.userService.removeUser(existUser.id);

    res.status(200).send({ message: "user deleted" });
  }

}

const userController = new UserController(userService);
module.exports = userController;
