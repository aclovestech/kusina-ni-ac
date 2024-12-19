// Express promise router
const Router = require("express-promise-router");
// HttpError
const HttpError = require("../utils/HttpError");
// DB (Knex)
const {
  getUsersByRoleName,
  getUserByUserId,
  updateUserByUserId,
  deleteUserByUserId,
  getUserAddressesByUserId,
  addNewAddressToUser,
  updateUserAddress,
  deleteUserAddress,
} = require("../models/users.model");
// Validations
const { validateIsUserAdmin } = require("../middleware/general.middleware");
const {
  validateUserQueryInput,
  validateUserAuthorization,
  validateUserIdInput,
  extractUserDetailsFromInput,
  validateNewAddressDetailsInput,
  validateUpdatedAddressDetailsInput,
  validateAddressIdInput,
} = require("../middleware/users.middleware");

const usersRouter = new Router();

// Gets all users if the user is an admin
usersRouter.get(
  "/",
  validateIsUserAdmin,
  validateUserQueryInput,
  async (req, res, next) => {
    // Query: Get all users
    const result = await getUsersByRoleName(req.validatedUserQueryInput);

    // Throw an error if the result is empty
    if (result.length === 0) throw new HttpError("No users found", 404);

    // Return the users
    res.status(200).json(result);
  }
);

// Gets a specific user
usersRouter.get(
  "/:userId",
  validateUserAuthorization,
  validateUserIdInput,
  async (req, res, next) => {
    // Query: Get the user details
    const result = await getUserByUserId(req.validatedUserId.user_id);

    // Return the user details
    res.status(200).json(result);
  }
);

// Updates a specific user
usersRouter.put(
  "/:userId",
  validateUserAuthorization,
  validateUserIdInput,
  extractUserDetailsFromInput,
  async (req, res, next) => {
    // Query: Update the user details
    const result = await updateUserByUserId(
      req.validatedUserId.user_id,
      req.userDetails
    );

    // Return the user details
    res.status(201).json(result);
  }
);

// Deletes a specific user
usersRouter.delete(
  "/:userId",
  validateIsUserAdmin,
  validateUserIdInput,
  async (req, res, next) => {
    // Query: Delete the user
    await deleteUserByUserId(req.validatedUserId.user_id);

    // Return that the user was deleted
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  }
);

// Gets all user addresses
usersRouter.get(
  "/:userId/addresses",
  validateUserAuthorization,
  validateUserIdInput,
  async (req, res, next) => {
    // Query: Get the user's addresses
    const result = await getUserAddressesByUserId(req.validatedUserId.user_id);

    // Return the data from the response
    res.status(200).json(result);
  }
);

// Adds a new user address
usersRouter.post(
  "/:userId/addresses",
  validateUserAuthorization,
  validateUserIdInput,
  validateNewAddressDetailsInput,
  async (req, res, next) => {
    // Query: Create a new row for the address
    const result = await addNewAddressToUser(
      req.validatedUserId.user_id,
      req.validatedNewAddress
    );

    // Return the newly created address
    res.status(201).json(result);
  }
);

// Updates a specific user address
usersRouter.put(
  "/:userId/addresses/:addressId",
  validateUserAuthorization,
  validateUserIdInput,
  validateAddressIdInput,
  validateUpdatedAddressDetailsInput,
  async (req, res, next) => {
    // Query: Update the address
    const result = await updateUserAddress(
      req.validatedUserId.user_id,
      req.validatedAddressId.address_id,
      req.validatedAddressDetails
    );

    // Return the updated address
    res.status(200).json(result);
  }
);

// Deletes a specific user address
usersRouter.delete(
  "/:userId/addresses/:addressId",
  validateUserAuthorization,
  validateUserIdInput,
  validateAddressIdInput,
  async (req, res, next) => {
    // Query: Delete the address
    await deleteUserAddress(
      req.validatedUserId.user_id,
      req.validatedAddressId.address_id
    );

    // Return that the address was deleted successfully
    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  }
);

module.exports = usersRouter;
