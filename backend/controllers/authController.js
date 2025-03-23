import config from "../config/config.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// Generate token
const generateToken = (res, userId, role) => {
  const token = jwt.sign({ userId, role }, config.JWT_SECRET, {
    expiresIn: config.JWT_TOKEN_EXPIRE,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.NODE_ENV === "production" ? true : false,
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
  });
};

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password, phone, role, secretCode } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (role === "admin" && secretCode !== config.ADMIN_SECRET_CODE) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid secret code" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || "user",
    });

    generateToken(res, user._id, user.role);

    await Notification.create({
      userId: user._id,
      title: "Welcome to the Platform",
      message: `Hello ${name}, welcome to our platform! Start exploring your dashboard.`,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user. Please try again.",
      error: error.message,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    generateToken(res, user._id, user.role);

    await Notification.create({
      userId: user._id,
      title: "Login Successful",
      message: `You have successfully logged into your account. Welcome back, ${user.name}!`,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password -resetPasswordToken -resetPasswordExpire")
      .populate("joinedQueues", "name description status");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    const resetURL = `${config.CLIENT_URL}/reset-password/${resetToken}`;
    await Notification.create({
      userId: user._id,
      title: "Password Reset Requested",
      message: `You requested a password reset. Use this link to reset your password: ${resetURL}. This link is valid for 10 minutes.`,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent via notification.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing password reset request.",
      error: error.message,
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    await Notification.create({
      userId: user._id,
      title: "Password Reset Successful",
      message:
        "Your password has been successfully reset. You can now log in with your new password.",
    });

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error resetting password.",
      error: error.message,
    });
  }
};

// Edit Profile
export const editProfile = async (req, res) => {
  const { name, phone } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      name: user.name,
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};
