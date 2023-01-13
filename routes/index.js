const express = require("express");
const router = express.Router();

const usersRouter = require("./user");
const advertsRouter = require("./adverts");

const verifyRoles = require("../middlewares/verifyRole");
const { Mentor, Student } = require("../models/userSchema");

router.use("/adverts", verifyRoles(Mentor), advertsRouter);
router.use("/user", usersRouter);

module.exports = router;