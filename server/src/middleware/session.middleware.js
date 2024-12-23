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
