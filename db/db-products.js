// DB (Knex)
const knex = require(".");
// HttpError
const HttpError = require("../utils/HttpError");

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

// Inserts a new product
const insertProduct = async (productDetails) => {
  try {
    // Query: Insert the product
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

// Gets the details of a specific product
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

// Deletes a specific product
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
  getProductsByCategoryId,
  isCategoryIdValid,
  insertProduct,
  getProductDetailsByProductId,
  updateProductByProductId,
  deleteProductByProductId,
};
