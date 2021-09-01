const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotpassword,
  resetpassword,
  verify,
} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/verify/:verifyToken").post(verify);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

module.exports = router;
