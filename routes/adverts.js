const express = require("express");
const router = express.Router();


const mentorRouter = require("./mentor");

const {
    getAdverts,
} = require("../controllers/advertController");

router.get("/", getAdverts);

router.use("/mentor", mentorRouter);

module.exports = router;