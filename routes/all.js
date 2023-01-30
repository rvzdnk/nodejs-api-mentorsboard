const express = require("express");
const { getAdverts } = require("../controllers/advertController");
const router = express.Router();

router.get("/all", getAdverts);

module.exports = router;