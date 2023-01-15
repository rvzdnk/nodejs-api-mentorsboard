const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();
const { PORT = 3000, DB_HOST } = process.env.DB_HOST;

const connection = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("Database connection successful.");
    app.listen(PORT, () => {
      console.log(`Server running. Use this API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error.");
    console.log(`Error message: ${err.message}`);
    process.exit(1);
  });