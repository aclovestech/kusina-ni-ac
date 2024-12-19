// Imports
const Router = require("express-promise-router");
const generalMiddleware = require("../middleware/general.middleware");
const usersMiddleware = require("../middleware/users.middleware");
const usersController = require("../controllers/users.controller");

const usersRouter = new Router();

// Gets all users if the user is an admin
usersRouter.get(
  "/",
  generalMiddleware.validateIsUserAdmin,
  usersMiddleware.validateUserQueryInput,
  usersController.getUsers
);

// Gets a specific user
usersRouter.get(
  "/:userId",
  usersMiddleware.validateUserAuthorization,
  usersMiddleware.validateUserIdInput,
  usersController.getUserById
);

// Updates a specific user
usersRouter.put(
  "/:userId",
  usersMiddleware.validateUserAuthorization,
  usersMiddleware.validateUserIdInput,
  usersMiddleware.extractUserDetailsFromInput,
  usersController.updateUser
);

// Deletes a specific user
usersRouter.delete(
  "/:userId",
  generalMiddleware.validateIsUserAdmin,
  usersMiddleware.validateUserIdInput,
  usersController.deleteUser
);

// Gets all user addresses
usersRouter.get(
  "/:userId/addresses",
  usersMiddleware.validateUserAuthorization,
  usersMiddleware.validateUserIdInput,
  usersController.getUserAddress
);

// Adds a new user address
usersRouter.post(
  "/:userId/addresses",
  usersMiddleware.validateUserAuthorization,
  usersMiddleware.validateUserIdInput,
  usersMiddleware.validateNewAddressDetailsInput,
  usersController.addNewUserAddress
);

// Updates a specific user address
usersRouter.put(
  "/:userId/addresses/:addressId",
  usersMiddleware.validateUserAuthorization,
  usersMiddleware.validateUserIdInput,
  usersMiddleware.validateAddressIdInput,
  usersMiddleware.validateUpdatedAddressDetailsInput,
  usersController.updateUserAddress
);

// Deletes a specific user address
usersRouter.delete(
  "/:userId/addresses/:addressId",
  usersMiddleware.validateUserAuthorization,
  usersMiddleware.validateUserIdInput,
  usersMiddleware.validateAddressIdInput,
  usersController.deleteUserAddress
);

module.exports = usersRouter;
