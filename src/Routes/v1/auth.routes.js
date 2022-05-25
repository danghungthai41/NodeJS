const express = require("express");
const UserController = require("../../Controllers/auth.controllers");
const { authenticate } = require("../../Middlewares/authentication");
const authRouter = express.Router();

authRouter.post("/login", UserController.login);
authRouter.get("/profile", authenticate, UserController.profile);

module.exports = authRouter;
