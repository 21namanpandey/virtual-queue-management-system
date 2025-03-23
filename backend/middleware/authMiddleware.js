import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config/config.js";

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

export const protect = async (req, res, next) => {
  let token = req.cookies?.token; 
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please log in again" });
    }
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
