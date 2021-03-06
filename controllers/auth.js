const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    const verifyToken = user.getVerifyToken();

    await user.save();

    const verifyUrl = `${process.env.CLIENT_URL}/verify/${verifyToken}`;

    const message = `
    <h1>Please Verify Your Account!</h1>
    <p>Please go to this link to verify your account</p>
    <a href=${verifyUrl} clicktracking=off>${verifyUrl}</a>
  `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Verify Account",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      return next(new ErrorResponse("Email could not be sent", 500));
    }

    // sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.verify = async (req, res, next) => {
  const verifyToken = crypto
    .createHash("sha256")
    .update(req.params.verifyToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      verifyToken,
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Verify Token", 400));
    }

    if (user.verified) {
      return next(new ErrorResponse("User Already Verified", 400));
    }

    user.verified = true;
    user.verifyToken = undefined;

    await user.save();

    res.status(201).json({ success: true, data: "Verify Success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 404));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 404));
    }

    if (!user.verified) {
      return next(new ErrorResponse("Account Not Verified", 404));
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Reset Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({ success: true, data: "Password Reset Success" });
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
