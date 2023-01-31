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


const verifyRoles = require("../middlewares/verifyRole");


router.get("/", authenticateUser, getAllUserAdverts);
router.post("/", authenticateUser,verifyRoles, validateCreationOrEditing, createAdvert);
router.patch("/:advertId", authenticateUser, validateCreationOrEditing, editAdvert);
router.delete("/:advertId", authenticateUser, deleteAdvert);

module.exports = router;