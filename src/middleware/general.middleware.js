// Imports
const HttpError = require("../utils/HttpError");

// Checks if the user is a customer
exports.validateIsUserACustomer = (req, res, next) => {
  // Get the role_id from the JWT
  const { role_name } = req.user;

  // Throw an error if the user is not a customer
  if (role_name !== "Customer") {
    throw new HttpError("Unauthorized", 401);
  }

  // Move to the next middleware
  next();
};

// Checks if the user is a seller
exports.validateIsUserASeller = (req, res, next) => {
  // Get the role_id from the JWT
  const { role_name } = req.user;

  // Throw an error if the user is not a customer
  if (role_name !== "Seller") {
    throw new HttpError("Unauthorized", 401);
  }

  // Move to the next middleware
  next();
};

exports.validateIsUserAdmin = (req, res, next) => {
  // Get the role_id from the JWT
  const { role_name } = req.user;

  // Throw an error if the user is not a customer
  if (role_name !== "Admin") {
    throw new HttpError("Unauthorized", 401);
  }

  // Move to the next middleware
  next();
};
