const express = require("express");
const UserController = require("../../Controllers/users.controllers.js");
const {
  authorize,
  authenticate,
} = require("../../Middlewares/authentication.js");
// url: /api/vi/users
const usersRouter = express.Router();

//GET
usersRouter.get("/", authenticate, authorize("ADMIN"), UserController.getUsers);

//GET/:ID
usersRouter.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  UserController.getUserById
);

//POST
usersRouter.post(
  "/",
  //Viết thêm api register cho user và create cho admin
  //   authenticate,
  //   authorize("ADMIN"),
  UserController.createUser
);

//PUT
usersRouter.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  UserController.updateUser
);

//PATCH
usersRouter.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  UserController.updateFieldUser
);

//Delete:
usersRouter.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  UserController.deleteUser
);

module.exports = usersRouter;
