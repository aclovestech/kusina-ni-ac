// Imports
const knex = require("../config/db");

// Retrieves the addresses by a given customer ID
exports.getCustomerAddresses = async (customer_id) => {
  // Query
  const result = await knex("customer_addresses")
    .select()
    .where("customer_id", customer_id);

  // Return the data from the response
  return result;
};

// Adds a new address to a given customer ID
exports.addNewAddressToCustomer = async (customer_id, addressData) => {
  return await knex.transaction(async (trx) => {
    // Check if the customer has any existing addresses
    const existingAddresses = await trx("customer_addresses").where(
      "customer_id",
      customer_id
    );

    // If the new address is to be the default, update other addresses
    if (existingAddresses.length === 0 || addressData.is_default) {
      await trx("customer_addresses")
        .update({ is_default: false })
        .where("customer_id", customer_id)
        .andWhere({ is_default: true });

      // Ensure the new address is marked as default
      addressData.is_default = true;
    }

    // Query
    const result = await trx("customer_addresses").insert(
      {
        customer_id: customer_id,
        ...addressData,
      },
      ["*"]
    );

    // Return the newly created address
    return result[0];
  });
};

// Updates a specific customer's address given an address ID
exports.updateCustomerAddress = async (
  customer_id,
  address_id,
  addressData
) => {
  return await knex.transaction(async (trx) => {
    if (!addressData.is_default) {
      // Check if the customer has any other addresses
      const existingAddresses = await trx("customer_addresses").where(
        "customer_id",
        customer_id
      );

      // Set the is_default property to true if the customer has no other addresses
      if (existingAddresses.length === 1) {
        addressData.is_default = true;
      }
    }

    // Check if the is_default property is true
    if (addressData.is_default) {
      // Set the is_default property of other addresses to false
      await trx("customer_addresses")
        .update({ is_default: false })
        .where("customer_id", customer_id)
        .andWhere({ is_default: true });
    }

    // Query: Update the address
    const result = await trx("customer_addresses")
      .update(addressData, ["*"])
      .where("address_id", address_id)
      .andWhere("customer_id", customer_id);

    // Return the updated address
    return result[0];
  });
};

// Deletes a specific customer address given an address ID
exports.deleteCustomerAddress = async (customer_id, address_id) => {
  return await knex.transaction(async (trx) => {
    // Get the default address of the customer
    const defaultAddress = await trx("customer_addresses")
      .first("address_id")
      .where("customer_id", customer_id)
      .andWhere("is_default", true);

    console.log(
      `chosen new default is ${defaultAddress.address_id} and input address id is ${address_id}`
    );

    // Check if the address to be deleted is the default
    if (defaultAddress.address_id === address_id) {
      // Get the first address that is not the default
      const newDefaultAddress = await trx("customer_addresses")
        .first("address_id")
        .where("customer_id", customer_id)
        .whereNot("address_id", address_id);

      // Set the is_default property of the new default address to true
      await trx("customer_addresses")
        .update({ is_default: true })
        .where("address_id", newDefaultAddress.address_id)
        .andWhere("customer_id", customer_id);
    }

    // Query: Delete the address
    return await trx("customer_addresses")
      .del()
      .where("address_id", address_id)
      .andWhere("customer_id", customer_id);
  });
};
