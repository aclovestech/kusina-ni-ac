// Imports
const { matchedData } = require("express-validator");

exports.isLoggedIn = (req, res, next) => {
  // Return an error if the user is not logged in
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "You are not logged in, please log in and try again." });
  }

  // Move to the next middleware
  next();
};

exports.isCustomerIdTheSame = (req, res, next) => {
  // Get the customer ID from the validated input
  const { customer_id } = matchedData(req);

  // Return an error if the customer ID is not the same
  if (customer_id !== req.user.customer_id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // Move to the next middleware
  next();
};
