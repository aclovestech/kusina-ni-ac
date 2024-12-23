// Imports
const productsModel = require("../models/products.model");
const { matchedData } = require("express-validator");

// Gets all products regardless of category
exports.handleGetAllProducts = async (req, res, next) => {
  // Get the current page from the validated input
  const { page } = matchedData(req);

  // Query
  const result = await productsModel.getAllProducts(page);

  // Throw an error if the result is empty
  if (result.length === 0) {
    return res
      .status(404)
      .json({ success: true, message: "No products found" });
  }

  // Return the products
  res.status(200).json(result);
};

// Gets the products with a given category ID
exports.handleGetProductsByCategoryId = async (req, res, next) => {
  // Get the category ID and current page from the validated input
  const { category_id, page } = matchedData(req);

  // Check if the category exists
  await checkIfCategoryExists(category_id);

  // Query
  const result = await productsModel.getProductsByCategoryId(category_id, page);

  // Throw an error if the result is empty
  if (result.length === 0) {
    return res
      .status(404)
      .json({ success: true, message: "No products found" });
  }

  // Return the products
  res.status(200).json(result);
};

// Gets a specific product by ID
exports.handleGetProductByProductId = async (req, res, next) => {
  // Get the product ID from the validated input
  const { product_id } = matchedData(req);

  // Query
  const result = await productsModel.getProductById(product_id);

  // Return the product
  res.status(200).json(result);
};

// Gets all categories
exports.handleGetAllCategories = async (req, res, next) => {
  // Query
  const result = await productsModel.getAllCategories();

  // Throw an error if the result is empty
  if (result.length === 0) {
    return res
      .status(404)
      .json({ success: true, message: "No categories found" });
  }

  // Return the categories
  res.status(200).json(result);
};

async function checkIfCategoryExists(category_id) {
  // Check if the category ID is valid
  const categoryExists = await productsModel.isCategoryIdValid(category_id);

  // Return an error if the category is not found
  if (!categoryExists) {
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
  }

  return;
}
