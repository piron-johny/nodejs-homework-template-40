const userService = require("../services/user.service");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

class UserController {
  userService;
  constructor(userService) {
    this.userService = userService;
  }

  async getUserById(req, res) {
    const { id } = req.user;
    const user = await this.userService.getUserById(id);

    if (!user) res.status(404).send({ message: "Not found" });

    res.status(200).send(user);
  }

  async getUserByToken(req, res) {
    const { email, id, subscription } = req.user;

    res.status(200).send({ email, id, subscription });
  }

  async updateUserSubscription(req, res) {
    const { id } = req.user;
    const { subscription } = req.body;
    const user = await this.userService.updateUser(id, { subscription });

    if (!user) return res.status(404).send({ message: "Not found" });

    res.status(200).send({ message: "user subscription updated" });
  }

  async updateUserAvatar(req, res) {
    const { path: avatarPath, originalname } = req.file;
    const { id } = req.user;
    const avatarsDir = path.join(process.cwd(), "public", "avatars");
    const ext = path.extname(originalname);
    const avatrName = `${id}${ext}`;
    const resUpload = path.join(avatarsDir, avatrName);
    const avatarUrl = path.join("public", "avatars", avatrName);

    try {
      await fs.rename(avatarPath, resUpload);
      await this.userService.updateUser(id, { avatarUrl });
      const avatar = await Jimp.read(resUpload);
      avatar.resize(250, 250).write(resUpload);

      res.status(200).send({ avatarUrl });
    } catch (err) {
      await fs.unlink(avatarPath);
      throw err;
    }
  }

  async verifyEmail(req, res) {
    const { verificationToken } = req.params;
    const user = await this.userService.getUserByVerificationToken(verificationToken);

    if (!user) return res.status(404).send({ message: "Not Found" });

    await this.userService.updateUser(user._id, {
      verificationToken: null,
      verify: true,
    });

    res.status(200).send({ message: "Verification successful" });
  }

  async sendVerifyEmail(req, res) {
    const { email } = req.body;
    const user = await this.userService.getUserByEmail(email);

    if (!user || !user.verify) return res.status(400).send({ message: 'Not Foumd' });
    if (user.verify) return res.status(400).send({ message: 'Verification has already been passed' });

    await this.userService.sendVerifyMsg(email, user.verificationToken);

    res.status(200).send({ message: "Verification email sent" })

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
