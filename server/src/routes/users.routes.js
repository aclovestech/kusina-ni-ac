// Imports
const Router = require("express-promise-router");
const usersController = require("../controllers/users.controller");
const usersValidator = require("../validators/users.validator");
const usersAddresses = require("./users-addresses.routes");
const {
  isCustomerIdTheSame,
  isLoggedIn,
} = require("../middleware/session.middleware");

const usersRouter = new Router();

// Middleware that checks if the user is logged in
usersRouter.use(isLoggedIn);

// Validate the input for customer ID and check if the customer ID is the same
usersRouter.use(
  "/:customer_id",
  usersValidator.validateCustomerIdInput,
  isCustomerIdTheSame
);

// Group routes
usersRouter
  .route("/:customer_id")
  // Gets the customer's basic data
  .get(usersController.handleGetCustomerBasicData)
  // Updates the customer's basic data
  .patch(
    // Validate the input first
    usersValidator.validateCustomerDataInput,
    usersController.handleUpdateCustomerBasicData
  )
  // Deletes the customer's account
  .delete(usersController.handleCustomerAccountDeletion);

// Customer's addresses route
usersRouter.use("/:customer_id/addresses", usersAddresses);

module.exports = usersRouter;
