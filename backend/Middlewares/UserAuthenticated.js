const User = require("../Model/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

const UserAuthenticated = async function (req, res, next) {
  const token = req.cookies?.token; 

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found!!!", 401));
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};

module.exports = UserAuthenticated;
