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

// Setup knex-paginate
const { attachPaginate } = require("knex-paginate");
attachPaginate();

// Queries
// Used for registering a new user
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

// Get the user's password hash
const getUserPasswordHash = async (email, cb) => {
  try {
    // Query: Get the password hash
    const [returnedData] = await knex
      .withSchema("users")
      .select("password_hash")
      .from("users")
      .where("email", email);

    // Throw an error if the user is not found
    if (!returnedData) {
      return cb(new HttpError("User not found", 400), false);
    }

    // Return the password hash
    return returnedData;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Get the user's login data
const getUserLoginData = async (email, cb) => {
  try {
    // Query: Get the user data that will be put into the JWT
    const [returnedData] = await knex("users.users")
      .join("roles.roles", "users.role_id", "=", "roles.role_id")
      .select(
        "users.user_id",
        { role_name: "roles.name" },
        "users.name",
        "users.email",
        "users.created_at"
      )
      .where("users.email", email);

    // Return the data from the response
    return cb(null, returnedData);
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Gets the products by category ID
const getProductsByCategoryId = async (category_id, perPage, currentPage) => {
  if (perPage > 50) perPage = 50;
  try {
    // Query: Get the products by category ID
    const result = await knex
      .select("products.*", "categories.*")
      .from("products.products")
      .join("products.categories", "categories.category_id", "=", category_id)
      .paginate({
        perPage: perPage,
        currentPage: currentPage,
      });

    // Return the data from the response
    return result.data;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Gets the categories
const isCategoryIdValid = async (category_id) => {
  try {
    // Query: Get the categories
    const result = await knex
      .select("*")
      .from("products.categories")
      .where("category_id", category_id);

    // Throw an error if the category is not found
    if (result.length === 0) {
      throw new HttpError("Category not found", 400);
    }

    // Return the data from the response
    return true;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError("Invalid category ID", 400);
  }
};

const insertProduct = async (productDetails) => {
  try {
    const [returnedData] = await knex("products.products").insert(
      productDetails,
      ["*"]
    );

    // Return the data from the response
    return returnedData;
  } catch (err) {
    // Throw an error if the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError("There was an error inserting the product", 400);
  }
};

const getProductDetailsByProductId = async (product_id) => {
  try {
    // Query: Get the product details
    const [returnedData] = await knex("products.products")
      .select("*")
      .where("product_id", product_id);

    // Return the data from the response
    return returnedData;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Updates the details of a specific product
const updateProductByProductId = async (product_id, productDetails) => {
  try {
    // Add the updated_at to update the timestamp
    productDetails.updated_at = knex.fn.now();
    // Query: Update the product
    const [returnedData] = await knex("products.products")
      .update(productDetails, ["*"])
      .where("product_id", product_id);

    // Return the data from the response
    return returnedData;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError("Invalid request", 404);
  }
};

const deleteProductByProductId = async (product_id) => {
  try {
    // Query: Delete the product
    await knex("products.products").del().where("product_id", product_id);
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError("Invalid request", 404);
  }
};

module.exports = {
  insertUserTransaction,
  getUserPasswordHash,
  getUserLoginData,
  getProductsByCategoryId,
  isCategoryIdValid,
  insertProduct,
  getProductDetailsByProductId,
  updateProductByProductId,
  deleteProductByProductId,
};
