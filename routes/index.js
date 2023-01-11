const express = require("express");
const router = express.Router();

const usersRouter = require("./user");

router.use("/user", usersRouter)

module.exports = router;