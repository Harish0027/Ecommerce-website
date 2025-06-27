const User = require("../Model/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/SendMail.js");
const UserController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const newUser = await User.create({
        name,
        email,
        password,
        avatar: {
          public_id: "temp_url.jpg",
          url: "temp_img.jpg",
        },
      });

      sendToken(newUser, 201, res);
    } catch (error) {
      return next(new ErrorHandler("User registration failed!!", 500));
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("All fields are required!!", 401));
    }
    const currentUser = await User.findOne(email).select("+password");

    if (!currentUser) {
      return next(new ErrorHandler("Invalid Email or password", 401));
    }
    const isSame = await currentUser.comparePassword(password);

    if (!isSame) {
      return next(new ErrorHandler("Invalid Email or password", 401));
    }

    sendToken(currentUser, 200, res);
  },
  logout: async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to logout", 500));
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Generate reset token and save to DB
      const resetToken = user.getResetPasswordToken();
      await user.save({ validateBeforeSave: false });

      // Build the reset password URL
      const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/password/reset/${resetToken}`;

      // Email message
      const message = `Your password reset token is:\n\n${resetPasswordUrl}\n\nIf you did not request this email, please ignore it.`;

      try {
        // Send the email
        await sendEmail({
          email: user.email,
          subject: "Ecommerce Website Password Recovery",
          message,
        });

        return res.status(200).json({
          success: true,
          message: `Email sent to ${user.email} successfully!`,
        });
      } catch (error) {
        // Cleanup on failure
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler("Failed to send email", 500));
      }
    } catch (error) {
      return next(new ErrorHandler("Failed to process forgot password", 500));
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const resetToken = req.params.token;

      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      const user = User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: {
          $gt: Date.now(),
        },
      });
      if (!user) {
        return next(
          new ErrorHandler("Token is not valid or it has been expired!!!", 500)
        );
      }
      if (req.body.password !== req.body.confirmedPassword) {
        new ErrorHandler("Password has not matched!!!", 500);
      }
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler("Failed to reset password", 500));
    }
  },
  getUserDetail: async (req, res, next) => {
    try {
      const currentUser = await User.findOne({ email: req.user.id });
      if (!currentUser) {
        return next(new ErrorHandler("User not found", 404));
      }
      return res.status(200).json({
        message: "User fetched successfully!!!",
        user: currentUser,
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to fetch user detail!!!", 500));
    }
  },
  updatePassword: async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).select("+password");
      const { oldPassword, newPassword, confirmedPassword } = req.body;

      if (user.comparePassword(oldPassword)) {
        return new ErrorHandler("Entered old password is incorrect", 400);
      }

      if (newPassword !== confirmedPassword) {
        return new ErrorHandler("Password does not match!!!", 400);
      }

      user.password = newPassword;
      await user.save();

      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler("Failed to update password!!!", 500));
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({
        message: "User profile updated successfully!!!",
        user: user,
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to update Profile!!!", 500));
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find();
      return res.status(200).json({
        message: "Users fetched successfully!!!",
        users: users,
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to fetch users!!!", 500));
    }
  },
  getUserbyId: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(new ErrorHandler("User does not exists with this Id", 404));
      }

      return res.status(200).json({
        message: "Users fetched successfully!!!",
        user: user,
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to fetch users!!!", 500));
    }
  },
  updateUserbyAdmin: async (req, res, next) => {
    try {
      const newData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
      }
      const user=await User.findByIdAndUpdate(req.params.id,newData,{
        new:true,
        runValidators:true
      })
      if (!user) {
        return next(new ErrorHandler("User does not exists with this Id", 404));
      }

      return res.status(200).json({
        message: "Users updated successfully!!!",
        user: user,
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to update users!!!", 500));
    }
  },
  deleteUserByAdmin: async (req, res, next) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
  
      if (!user) {
        return next(new ErrorHandler("User does not exist with this ID", 404));
      }
  
      return res.status(200).json({
        success: true,
        message: "User deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to delete user", 500));
    }
  }  
};

module.exports = UserController;
