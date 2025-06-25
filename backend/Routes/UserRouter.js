const UserController=require("../Controllers/UserController");
const express=require("express");
const UserAuthenticated = require("../Middlewares/UserAuthenticated");
const AuthoriseRole = require("../Middlewares/AuthoriseRole");

const UserRouter=express.Router();

UserRouter.post("/register",UserController.register);
UserRouter.post("/login",UserController.login);
UserRouter.post("/logot",UserController.logout);
UserRouter.post("/password/forgot",UserController.forgotPassword);
UserRouter.put("/password/reset/:token",UserController.forgotPassword);
UserRouter.get("/me",UserAuthenticated,UserController.getUserDetail);
UserRouter.put("/password/updatePassword",UserAuthenticated,UserController.updatePassword);
UserRouter.put("/me/update",UserAuthenticated,UserController.updateProfile);

UserRouter.get("/admin/getAllUsers",UserAuthenticated,AuthoriseRole("admin"),UserController.getAllUsers);
UserRouter.get("/admin/getuser/:id",UserAuthenticated,AuthoriseRole("admin"),UserController.getUserbyId);
UserRouter.get("/admin/updateUser/:id",UserAuthenticated,AuthoriseRole("admin"),UserController.updateUserbyAdmin);
UserRouter.get("/admin/deleteUser/:id",UserAuthenticated,AuthoriseRole("admin"),UserController.deleteUserByAdmin);

module.exports=UserRouter