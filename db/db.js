// Dotenv
const dotenv = require("dotenv");
// HttpError
const HttpError = require("../utils/HttpError");
// Determine which .env file to load based on NODE_ENV
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

// Knex config
const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },
});

// Queries
const insertUserTransaction = async (
  name,
  email,
  hashedPassword,
  role_id = 3
) => {
  try {
    // Begin Transaction
    const result = await knex.transaction(async (trx) => {
      // Insert a row within the users.users table with the required data
      const [returnedData] = await trx
        .withSchema("users")
        .insert([
          {
            name: name,
            email: email,
            password_hash: hashedPassword,
            role_id: role_id,
          },
        ])
        .into("users")
        .returning(["user_id", "email", "created_at", "role_id"]);
      // After the user is created, get the returned user_id and insert a row within the customers.customer_details table
      await trx
        .withSchema("customers")
        .insert({ customer_id: returnedData.user_id })
        .into("customer_details");
      // After that insert a row within the customers.carts table
      await trx
        .withSchema("customers")
        .insert({ customer_id: returnedData.user_id })
        .into("carts");

      // Return back the user_id, email, and created_at
      return returnedData;
    });

    // Return the result if the transaction was successful
    return result;
  } catch (err) {
    // Throw an error since the transaction was unsuccessful
    console.error(`Transaction error: ${err.message}`);
    throw new HttpError();
  }
};

module.exports = {
  insertUserTransaction,
};
