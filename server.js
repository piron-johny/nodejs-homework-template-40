const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 8081;
const DB = process.env.DB;

mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(PORT);
  })
  .then(() => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  })
  .catch((err) => {
    console.log('ERROR', err);
    process.exit(1);
  })
