// Express promise router
const Router = require("express-promise-router");
// Node-postgres (pg)
const db = require("../db/index");
// JWT
const jwt = require("../utils/jwt");
// HttpError
const HttpError = require("../utils/HttpError");
// Joi
const Joi = require("joi");

const productsRouter = new Router();

// Provides the products with a specific category (/products?category={categoryId})
productsRouter.get("/", async (req, res, next) => {
  // Specify joi schema
  const schema = Joi.object({
    category_id: Joi.number().required(),
  });

  // Validate the input
  const { value, error } = schema.validate({ category_id: req.query.category });

  // Throw an error if the category ID is blank
  if (error) {
    throw new HttpError("Invalid category ID", 404);
  }

  // These two variables will be used in our queries
  let query;
  let queryResponse;

  // Query: Get the product details
  query = `
  SELECT c.*, p.*
  FROM products.products AS p
  JOIN products.categories AS c
    ON c.category_id = $1`;
  // Response
  queryResponse = await db.query(query, [value.category_id]);

  // Return the products
  res.status(200).json(queryResponse.rows);
});

// Adds a product to the database
productsRouter.post("/", jwt.authenticateToken, async (req, res, next) => {
  // Get the role_id from the JWT
  const { role_name, user_id } = req.user;

  // Throw an error if the user is not a seller
  if (role_name !== "Seller" && role_name !== "Admin") {
    throw new Error("Unauthorized", 401);
  }

  // Specify joi schema
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock_quantity: Joi.number().required(),
    category_id: Joi.number().required(),
  });

  // Validate the input
  const { value, error } = schema.validate(req.body);

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Missing required data", 400);
  }

  // These two variables will be used in our queries
  let query;
  let queryResponse;

  // Query: Check all categories
  query = `SELECT * FROM products.categories`;
  // Response
  queryResponse = await db.query(query);

  // Validate if the category from the input
  const filteredArray = queryResponse.rows.filter((row) => {
    return row.category_id === value.category_id;
  });

  // Throw an error if the given category ID is not found
  if (filteredArray.length === 0) {
    throw new HttpError("Invalid category ID", 400);
  }

  // Establish a new connection to the database since we are going to make a transaction
  const client = await db.getClient();

  try {
    // Begin transaction
    await client.query("BEGIN");

    // Query: Check all categories
    query = `
      INSERT INTO products.products(seller_id, category_id, name, description, price, stock_quantity)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `;
    // Response
    queryResponse = await client.query(query, [
      user_id,
      value.category_id,
      value.name,
      value.description,
      value.price,
      value.stock_quantity,
    ]);

    // Commit the transaction if all queries we successful
    await client.query("COMMIT");
  } catch (err) {
    // Rollback the transaction if a query was unsuccessful
    await client.query("ROLLBACK");

    // Throw an error since the transaction was unsuccessful
    console.error(`Transaction error: ${err.message}`);
    err.message = "Invalid request";
    err.statusCode = 400;
    throw err;
  } finally {
    // Release the connection after doing the transaction
    client.release();
  }

  res.status(201).json(queryResponse.rows[0]);
});

// Provides the details of a specific product
productsRouter.get("/:productId", async (req, res, next) => {
  // Specify joi schema
  const schema = Joi.object({
    product_id: Joi.string().uuid().required(),
  });

  // Validate the input
  const { value, error } = schema.validate({
    product_id: req.params.productId,
  });

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Invalid product ID", 404);
  }

  // These two variables will be used in our queries
  let query;
  let queryResponse;

  // Query: Check all categories
  query = `
  SELECT * FROM products.products
  WHERE product_id = $1`;
  // Response
  queryResponse = await db.query(query, [value.product_id]);

  res.status(200).json(queryResponse.rows);
});

module.exports = productsRouter;
