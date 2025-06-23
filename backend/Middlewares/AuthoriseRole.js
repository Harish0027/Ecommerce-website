const ErrorHandler = require("../utils/ErrorHandler");

const AuthoriseRole = (checkRole) => {
  return function (req, res, next) {
    try {
      const user = req.user;
      if (user.role === checkRole) {
        next();
      }

      return next(new ErrorHandler("You are not allowed to access this resource!!.", 403));
    } catch (error) {
      return next(new ErrorHandler("internal server error", 500));
    }
  };
};

module.exports = AuthoriseRole;
