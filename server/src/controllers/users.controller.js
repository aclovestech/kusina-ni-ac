// Imports
const usersModel = require("../models/users.model");
const { matchedData } = require("express-validator");

// Get the customer's basic data
exports.handleGetCustomerBasicData = async (req, res, next) => {
  // Query
  const result = await usersModel.getCustomerBasicDataByCustomerId(
    req.user.customer_id
  );

  // Return the user details
  res.status(200).json(result);
};

// Update the customer's basic data
exports.handleUpdateCustomerBasicData = async (req, res, next) => {
  // Get the input from the validated input
  const userInput = matchedData(req);

  // Return an error if the user input is empty
  if (Object.keys(userInput).length === 0) {
    return res
      .status(400)
      .json({ message: "Missing required data, please try again." });
  }

  // Query
  const result = await usersModel.updateCustomerBasicDataByCustomerId(
    req.user.customer_id,
    userInput
  );

  // Return the user details
  res.status(201).json(result);
};

// Delete the customer's account
exports.handleCustomerAccountDeletion = async (req, res, next) => {
  await usersModel.deleteCustomerAccountByCustomerId(req.user.customer_id);

  // Return that the user was deleted
  res
    .status(200)
    .json({ success: true, message: "Account deleted successfully" });
};
