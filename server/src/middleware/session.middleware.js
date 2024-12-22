// Imports
// const { matchedData } = require("express-validator");
// const { isCartOwnedByCustomer } = require("../models/cart.model");

exports.checkIsCustomerLoggedIn = (req, res, next) => {
  // Return an error if the user is not logged in
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "You are not logged in, please log in and try again." });
  }

  // Move to the next middleware
  next();
};

// exports.checkIsCustomerIdTheSame = (req, res, next) => {
//   // Get the customer ID from the validated input
//   const { customer_id } = matchedData(req);

//   // Return an error if the customer ID is not the same
//   if (customer_id !== req.user.customer_id) {
//     return res.status(403).json({ message: "Unauthorized" });
//   }

//   // Move to the next middleware
//   next();
// };

// exports.checkIsCartOwnedByCustomer = async (req, res, next) => {
//   const isOwned = await isCartOwnedByCustomer(
//     req.session.cart_id,
//     req.user.customer_id
//   );

//   // Return an error if the cart is not owned by the customer
//   if (!isOwned) {
//     return res.status(403).json({ message: "Unauthorized" });
//   }

//   // Move to the next middleware
//   next();
// };
