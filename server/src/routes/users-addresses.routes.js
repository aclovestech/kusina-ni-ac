// Imports
const Router = require("express-promise-router");
const usersAddressesController = require("../controllers/users-addresses.controller");
const usersAddressesValidator = require("../validators/users-addresses.validator");

const usersAddressesRouter = new Router();

// Gets the customer's addresses
usersAddressesRouter.get(
  "/",
  usersAddressesController.handleGetCustomerAddresses
);

// Adds a new address
usersAddressesRouter.post(
  "/",
  // Validate the input first
  usersAddressesValidator.validateNewAddressDataInput,
  // Then add the new address
  usersAddressesController.handleAddNewCustomerAddress
);

// Validate the input for the address ID
usersAddressesRouter.use(
  "/:address_id",
  usersAddressesValidator.validateAddressIdInput
);

usersAddressesRouter
  .route("/:address_id")
  // Updates the customer's address
  .patch(
    usersAddressesValidator.validateAddressDataToUpdateInput,
    usersAddressesController.handleUpdateCustomerAddress
  )
  // Deletes the customer's address
  .delete(usersAddressesController.handleDeleteCustomerAddress);

module.exports = usersAddressesRouter;
