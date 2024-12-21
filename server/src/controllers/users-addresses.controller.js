// Imports
const usersAddressesModel = require("../models/users-addresses.model");
const { matchedData } = require("express-validator");

// Get the customer's addresses
exports.handleGetCustomerAddresses = async (req, res, next) => {
  // Get the customer ID from the validated input
  const { customer_id } = matchedData(req);

  // Query
  const result = await usersAddressesModel.getCustomerAddresses(customer_id);

  if (result.length === 0) {
    return res
      .status(200)
      .json({ status: true, message: "No addresses found" });
  }

  // Return the data from the response
  res.status(200).json(result);
};

// Add a new address
exports.handleAddNewCustomerAddress = async (req, res, next) => {
  // Get the customer ID and address data from the validated input
  const { customer_id, ...addressData } = matchedData(req);

  // Query
  const result = await usersAddressesModel.addNewAddressToCustomer(
    customer_id,
    addressData
  );

  // Return the newly created address
  res.status(201).json(result);
};

// Update the customer's address
exports.handleUpdateCustomerAddress = async (req, res, next) => {
  // Get the customer ID, address ID, and address data from the validated input
  const { customer_id, address_id, ...addressData } = matchedData(req);

  // Query
  const result = await usersAddressesModel.updateCustomerAddress(
    customer_id,
    address_id,
    addressData
  );

  // Return the updated address
  res.status(200).json(result);
};

// Delete a customer's address
exports.handleDeleteCustomerAddress = async (req, res, next) => {
  // Get the customer ID and address ID from the validated input
  const { customer_id, address_id } = matchedData(req);

  // Query
  await usersAddressesModel.deleteCustomerAddress(customer_id, address_id);

  // Return that the address was deleted successfully
  res
    .status(200)
    .json({ success: true, message: "Address deleted successfully" });
};
