const app = require("./app");
const mongoose = require("mongoose");
const path = require('path');
const fs = require('fs').promises;
require("dotenv").config();

const PORT = process.env.PORT || 8081;
const DB = process.env.DB;

const uploadDir = path.join(process.cwd(), 'uploads');
const storeImage = path.join(process.cwd(), 'public', 'avatars');

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(PORT, async () => {
      createFolderIsNotExist(uploadDir);
      createFolderIsNotExist(storeImage);
    });
  })
  .then(() => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  })
  .catch((err) => {
    console.log("ERROR", err);
    process.exit(1);
  });
