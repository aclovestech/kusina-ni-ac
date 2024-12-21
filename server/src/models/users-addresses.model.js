// Imports
const knex = require("../config/db");

// Gets the addresses of a specific user
exports.getUserAddressesByUserId = async (user_id) => {
  // Query: Get the user's addresses
  const result = await knex("customers.customer_addresses")
    .select("*")
    .where("customer_id", user_id);

  // Return the data from the response
  return result;
};

// Adds a new address to a specific user
exports.addNewAddressToUser = async (user_id, addressDetails) => {
  // Query: Check if the user has any existing addresses
  const existingAddresses = await knex("customers.customer_addresses").where(
    "customer_id",
    user_id
  );

  // Set the is_default property to true if the user has no existing addresses
  if (existingAddresses.length === 0) {
    addressDetails.is_default = true;
  }

  // Set the is_default property to false if it's not already set
  if (!addressDetails.is_default) {
    addressDetails.is_default = false;
  }

  // Query: Create a new row for the address
  const [returnedData] = await knex("customers.customer_addresses").insert(
    {
      customer_id: user_id,
      ...addressDetails,
    },
    ["*"]
  );

  // Return the newly created address
  return returnedData;
};

// Updates a specific user address
exports.updateUserAddress = async (user_id, address_id, addressDetails) => {
  // Begin Transaction
  const result = await knex.transaction(async (trx) => {
    // Check if the is_default property is true
    if (addressDetails.is_default) {
      // Query: Set the is_default property of other addresses to false
      await trx("customers.customer_addresses")
        .update({ is_default: false })
        .where("customer_id", user_id)
        .andWhere({ is_default: true });
    } else {
      // Query: Check if the user has any other addresses
      const existingAddresses = await trx("customers.customer_addresses").where(
        "customer_id",
        user_id
      );

      // Set the is_default property to true if the user has no other addresses
      if (existingAddresses.length === 1) {
        addressDetails.is_default = true;
      }
    }

    // Query: Update the address
    const [returnedData] = await trx("customers.customer_addresses")
      .update(addressDetails, ["*"])
      .where("address_id", address_id)
      .andWhere("customer_id", user_id);

    // Return the updated address
    return returnedData;
  });

  // Return the updated address
  return result;
};

// Deletes a specific user address
exports.deleteUserAddress = async (user_id, address_id) => {
  // Begin Transaction
  await knex.transaction(async (trx) => {
    // Query: Delete the address
    await trx("customers.customer_addresses")
      .del()
      .where("address_id", address_id)
      .andWhere("customer_id", user_id);

    // Query: Check if there is a default address for the user
    const [defaultAddress] = await trx("customers.customer_addresses")
      .select("address_id")
      .where("customer_id", user_id)
      .andWhere("is_default", true);

    if (!defaultAddress) {
      // Query: Get the first address for the user
      const subquery = await trx("customers.customer_addresses")
        .select("address_id")
        .where("customer_id", user_id)
        .first();

      // Query: Set the is_default property of the first address to true
      await trx("customers.customer_addresses")
        .update({ is_default: true })
        .where("address_id", subquery.address_id)
        .andWhere("customer_id", user_id);
    }

    // Commit the transaction
    return trx;
  });

  // Return
  return;
};
