const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./config/passport");

const indexRouter = require("./routes/index");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use("/", indexRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: `Use api on routes: ...`,
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;