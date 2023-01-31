const express = require("express");
const router = express.Router();

const usersRouter = require("./user");
const advertsRouter = require("./adverts");


router.use("/adverts", advertsRouter);
router.use("/user", usersRouter);


module.exports = router;