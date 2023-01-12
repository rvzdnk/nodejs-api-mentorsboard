const express = require("express");
const router = express.Router();

const usersRouter = require("./user");
const advertsRouter = require("./adverts");
const { getAdverts } = require("../controllers/advertController");

router.use("/", getAdverts);
router.use("/adverts", advertsRouter);
router.use("/user", usersRouter);

module.exports = router;