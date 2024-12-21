// Imports
const knex = require("../config/db");

// Constants
const MAX_PRODUCTS_PER_PAGE = 10;

// Gets all products
exports.getAllProducts = async (currentPage) => {
  // Query
  const result = await knex("products")
    .select(
      "categories.category_id",
      "categories.name as category_name",
      "products.*"
    )
    .join("categories", "categories.category_id", "products.category_id")
    .paginate({
      perPage: MAX_PRODUCTS_PER_PAGE,
      currentPage: currentPage,
    });

  // Return the data from the response
  return result.data.map((productDetails) => {
    return {
      ...productDetails,
      price: Number(productDetails.price),
    };
  });
};

// Gets the products by category ID
exports.getProductsByCategoryId = async (category_id, currentPage) => {
  // Query
  const result = await knex("products")
    .select(
      "categories.category_id",
      "categories.name as category_name",
      "products.*"
    )
    .join("categories", "categories.category_id", "products.category_id")
    .where("categories.category_id", category_id)
    .paginate({
      perPage: MAX_PRODUCTS_PER_PAGE,
      currentPage: currentPage,
    });
  // Return the data from the response
  return result.data.map((productDetails) => {
    return {
      ...productDetails,
      price: Number(productDetails.price),
    };
  });
};

// Gets a specific product by ID
exports.getProductById = async (product_id) => {
  // Query
  const result = await knex("products")
    .first(
      "categories.category_id",
      "categories.name as category_name",
      "products.*"
    )
    .join("categories", "categories.category_id", "products.category_id")
    .where("product_id", product_id);

  // Return the data from the response
  return { ...result, price: Number(result.price) };
};

// Gets all categories
exports.getAllCategories = async () => {
  // Query
  const result = await knex("categories").select("*");

  // Return the data from the response
  return result;
};

// Checks if the category ID is valid
exports.isCategoryIdValid = async (category_id) => {
  // Query
  const result = await knex("categories")
    .select()
    .where("category_id", category_id);

  // Throw an error if the category is not found
  if (result.length === 0) {
    return false;
  }

  // Return the data from the response
  return true;
};
