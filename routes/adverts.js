const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser");
const { validateCreationOrEditing } = require("../middlewares/advertValidation");

const {
    getAllUserAdverts,
    createAdvert,
    editAdvert,
    deleteAdvert,
} = require("../controllers/advertController");


router.get("/", authenticateUser, getAllUserAdverts);
router.post("/", authenticateUser, validateCreationOrEditing, createAdvert);
router.patch("/:advertId", authenticateUser, validateCreationOrEditing, editAdvert);
router.delete("/:advertId", authenticateUser, deleteAdvert);

module.exports = router;