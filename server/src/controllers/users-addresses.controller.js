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
