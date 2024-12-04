// DB (Knex)
const { func } = require("joi");
const knex = require(".");
// HttpError
const HttpError = require("../utils/HttpError");
// Bcrypt
const { hashPassword } = require("../utils/bcrypt");

// Maps the role ID to the table name and ID column
const roleDetailsMap = {
  1: {
    role_name: "admin",
    table: "admins.admin_details",
    idColumn: "admin_details.admin_id",
  },
  2: {
    role_name: "seller",
    table: "sellers.seller_details",
    idColumn: "seller_details.seller_id",
  },
  3: {
    role_name: "customer",
    table: "customers.customer_details",
    idColumn: "customer_details.customer_id",
  },
};

// Gets the users with a given role name
const getUsersByRoleName = async ({ role_name, perPage, currentPage }) => {
  // Set the perPage to 100 if it's greater than 100
  if (perPage > 100) perPage = 100;

  // Get the role table and ID column from the map based on the role name
  const filteredRoleDetails = Object.entries(roleDetailsMap).find(
    ([key, role]) => role.role_name === role_name
  );

  // Throw an error if the role name is not found
  if (filteredRoleDetails.length === 0) {
    throw new HttpError("Invalid role name", 400);
  }

  // Extract the role ID, table, and ID column
  const role_id = filteredRoleDetails[0];
  const { table, idColumn } = filteredRoleDetails[1];

  try {
    // Query: Get the users
    const result = await knex("users.users")
      .select("*")
      .leftJoin(table, "users.user_id", idColumn)
      .where("users.role_id", role_id)
      .paginate({
        perPage: perPage,
        currentPage: currentPage,
      });

    // Return the data from the response
    return result.data;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError(err.message, 400);
  }
};

// Gets the user details by a given user ID
const getUserByUserId = async (user_id) => {
  try {
    // Query: Get the user's role ID
    const [{ role_id }] = await knex("users.users")
      .select("role_id")
      .where("user_id", user_id);

    // Throw an error if the user ID is not found
    if (!role_id) {
      throw new HttpError("Invalid user ID", 400);
    }

    // Throw an error if the role ID is not found
    if (!roleDetailsMap[role_id]) {
      throw new HttpError("Invalid role name", 400);
    }

    // Extract the table and ID column from the map
    const { table, idColumn } = roleDetailsMap[role_id];

    // Query: Get the user details
    const [returnedData] = await knex("users.users")
      .select("*")
      .leftJoin(table, "users.user_id", idColumn)
      .where("users.user_id", user_id);

    // Return the data from the response
    return returnedData;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Updates the details of a specific user
const updateUserByUserId = async (user_id, userDetails) => {
  let result;

  try {
    // Query: Update the user details
    const { role_id, baseUpdates, detailedUpdates } = userDetails;
    const { table, idColumn } = roleDetailsMap[role_id];

    // Begin Transaction
    await knex.transaction(async (trx) => {
      // Check if the baseUpdates object is not empty
      if (Object.keys(baseUpdates).length > 0) {
        // Hash the password if it's provided
        if (baseUpdates.password) {
          baseUpdates.password_hash = await hashPassword(baseUpdates.password);
          // Delete the password property
          delete baseUpdates.password;
        }
        // Update the users table
        await trx("users.users").update(baseUpdates).where("user_id", user_id);
      }

      // Check if the detailedUpdates object is not empty
      if (Object.keys(detailedUpdates).length > 0) {
        // Update the table (e.g., admins.admin_details, sellers.seller_details, customers.customer_details, etc.)
        await trx(table).update(detailedUpdates).where(idColumn, user_id);
      }

      // Commit the transaction
      return;
    });

    // Save the result
    result = await knex("users.users")
      .select("*")
      .leftJoin(table, "users.user_id", idColumn)
      .where("users.user_id", user_id);
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }

  return result;
};

// Deletes a specific user
const deleteUserByUserId = async (user_id) => {
  try {
    // Query: Delete the user
    await knex("users.users").del().where("user_id", user_id);
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Gets the addresses of a specific user
const getUserAddressesByUserId = async (user_id) => {
  try {
    // Query: Get the user's addresses
    const result = await knex("customers.customer_addresses")
      .select("*")
      .where("customer_id", user_id);

    // Return the data from the response
    return result;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Adds a new address to a specific user
const addNewAddressToUser = async (user_id, addressDetails) => {
  try {
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
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Updates a specific user address
const updateUserAddress = async (user_id, address_id, addressDetails) => {
  try {
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
        const existingAddresses = await trx(
          "customers.customer_addresses"
        ).where("customer_id", user_id);

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
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Deletes a specific user address
const deleteUserAddress = async (user_id, address_id) => {
  try {
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

    return;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

module.exports = {
  getUsersByRoleName,
  getUserByUserId,
  updateUserByUserId,
  deleteUserByUserId,
  getUserAddressesByUserId,
  addNewAddressToUser,
  updateUserAddress,
  deleteUserAddress,
};
