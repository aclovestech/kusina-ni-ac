// Imports
const productsModel = require("../models/products.model");
const HttpError = require("../utils/HttpError");

// Query: Get the products by category ID
exports.getProductsByCategory = async (req, res, next) => {
  const result = await productsModel.getProductsByCategoryId(
    req.validatedProductWithCategoryQueryInput.category_id
  );

  // Throw an error if the result is empty
  if (result.length === 0) {
    throw new HttpError("No products found", 404);
  }

  // Return the products
  res.status(200).json(result);
};

// Query: Insert the product
exports.insertProduct = async (req, res, next) => {
  const result = await productsModel.insertProduct(
    req.validatedNewProductDetailsInput
  );

  // Throw an error if the result is empty
  if (result.length === 0) {
    throw new HttpError("No products found", 404);
  }

  // Return the newly created product
  res.status(201).json(result);
};

// Query: Get the product details
exports.getProductDetails = async (req, res, next) => {
  const result = await productsModel.getProductDetailsByProductId(
    req.validatedProductIdInput.product_id
  );

  // Throw an error if the product is not found
  if (!result) {
    throw new HttpError("Product not found", 404);
  }

  // Return the products
  res.status(200).json(result);
};

// Query: Update the product
exports.updateProduct = async (req, res, next) => {
  const result = await productsModel.updateProductByProductId(
    req.params.productId,
    req.validatedUpdatedProductDetailsInput
  );

  // Return the updated product
  res.status(200).json(result);
};

// Query: Delete the product
exports.deleteProduct = async (req, res, next) => {
  await productsModel.deleteProductByProductId(req.params.productId);

  // Send a 200 status response if the transaction was successful
  res
    .status(200)
    .send({ success: true, message: "Product successfully deleted" });
};
