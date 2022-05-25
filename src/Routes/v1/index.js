const express = require("express");
const usersRouter = require("./users.routes");
const authRouter = require("./auth.routes");
//url: api/
const rootRouter = express.Router();

rootRouter.use("/users", usersRouter);
rootRouter.use("/auth", authRouter);

module.exports = rootRouter;
