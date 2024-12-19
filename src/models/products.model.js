// DB (Knex)
const knex = require("../config/db");
// HttpError
const HttpError = require("../utils/HttpError");

// Gets the products by category ID
const getProductsByCategoryId = async (category_id, perPage, currentPage) => {
  if (perPage > 50) perPage = 50;

  // Query: Get the products by category ID
  const result = await knex("products.products")
    .select("products.*", "categories.name as category_name")
    .join("products.categories", "categories.category_id", category_id)
    .paginate({
      perPage: perPage,
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

// Gets the categories
const isCategoryIdValid = async (category_id) => {
  // Query: Get the categories
  const result = await knex("products.categories")
    .select("*")
    .where("category_id", category_id);

  // Throw an error if the category is not found
  if (result.length === 0) {
    throw new HttpError("Category not found", 400);
  }

  // Return the data from the response
  return true;
};

// Inserts a new product
const insertProduct = async (productDetails) => {
  // Query: Insert the product
  const [returnedData] = await knex("products.products").insert(
    productDetails,
    ["*"]
  );

  // Return the data from the response
  return {
    ...returnedData,
    price: Number(returnedData.price),
  };
};

// Gets the details of a specific product
const getProductDetailsByProductId = async (product_id) => {
  // Query: Get the product details
  const [returnedData] = await knex("products.products")
    .select("products.*", "categories.name as category_name")
    .join(
      "products.categories",
      "categories.category_id",
      "products.category_id"
    )
    .where("product_id", product_id);

  // Return the data from the response
  return {
    ...returnedData,
    price: Number(returnedData.price),
  };
};

// Updates the details of a specific product
const updateProductByProductId = async (product_id, productDetails) => {
  // Add the updated_at to update the timestamp
  productDetails.updated_at = knex.fn.now();
  // Query: Update the product
  const [returnedData] = await knex("products.products")
    .update(productDetails, ["*"])
    .where("product_id", product_id);

  // Return the data from the response
  return { ...returnedData, price: Number(returnedData.price) };
};

// Deletes a specific product
const deleteProductByProductId = async (product_id) => {
  // Query: Delete the product
  return await knex("products.products").del().where("product_id", product_id);
};

module.exports = {
  getProductsByCategoryId,
  isCategoryIdValid,
  insertProduct,
  getProductDetailsByProductId,
  updateProductByProductId,
  deleteProductByProductId,
};
