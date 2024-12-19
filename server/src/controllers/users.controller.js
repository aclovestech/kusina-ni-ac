// Imports
const usersModel = require("../models/users.model");
const HttpError = require("../utils/HttpError");

// Query: Get all users
exports.getUsers = async (req, res, next) => {
  const result = await usersModel.getUsersByRoleName(
    req.validatedUserQueryInput
  );

  // Throw an error if the result is empty
  if (result.length === 0) throw new HttpError("No users found", 404);

  // Return the users
  res.status(200).json(result);
};

// Query: Get the user details
exports.getUserById = async (req, res, next) => {
  const result = await usersModel.getUserByUserId(req.validatedUserId.user_id);

  // Return the user details
  res.status(200).json(result);
};

// Query: Update the user details
exports.updateUser = async (req, res, next) => {
  const result = await usersModel.updateUserByUserId(
    req.validatedUserId.user_id,
    req.userDetails
  );

  // Return the user details
  res.status(201).json(result);
};

// Query: Delete the user
exports.deleteUser = async (req, res, next) => {
  await usersModel.deleteUserByUserId(req.validatedUserId.user_id);

  // Return that the user was deleted
  res.status(200).json({ success: true, message: "User deleted successfully" });
};

// Query: Get the user's addresses
exports.getUserAddress = async (req, res, next) => {
  const result = await usersModel.getUserAddressesByUserId(
    req.validatedUserId.user_id
  );

  // Return the data from the response
  res.status(200).json(result);
};

// Query: Create a new row for the address
exports.addNewUserAddress = async (req, res, next) => {
  const result = await usersModel.addNewAddressToUser(
    req.validatedUserId.user_id,
    req.validatedNewAddress
  );

  // Return the newly created address
  res.status(201).json(result);
};

// Query: Update the address
exports.updateUserAddress = async (req, res, next) => {
  const result = await usersModel.updateUserAddress(
    req.validatedUserId.user_id,
    req.validatedAddressId.address_id,
    req.validatedAddressDetails
  );

  // Return the updated address
  res.status(200).json(result);
};

// Query: Delete the address
exports.deleteUserAddress = async (req, res, next) => {
  await usersModel.deleteUserAddress(
    req.validatedUserId.user_id,
    req.validatedAddressId.address_id
  );

  // Return that the address was deleted successfully
  res
    .status(200)
    .json({ success: true, message: "Address deleted successfully" });
};
