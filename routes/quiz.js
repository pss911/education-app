const express = require("express");
const router = express.Router();
const { create } = require("../controllers/quiz");
const { protect } = require("../middleware/auth");

router.route("/create").post(protect, create);

module.exports = router;
