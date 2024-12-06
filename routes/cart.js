// Express promise router
const Router = require("express-promise-router");
// HttpError
const HttpError = require("../utils/HttpError");
// Joi
const Joi = require("joi");
// DB (Knex)
const {
  createNewCart,
  addItemsToCart,
  validateCartIdByUserId,
  getCartItemsByCartId,
} = require("../db/db-cart");

const cartRouter = new Router();

// Creates a new cart
cartRouter.post("/", checkUserAuthorization, async (req, res, next) => {
  // Query: Create a new cart
  const result = await createNewCart(req.user.user_id);

  // Return the newly created cart
  res.status(201).json(result);
});

// Gets a specific cart
cartRouter.get(
  "/:cartId",
  checkUserAuthorization,
  validateCartIdInput,
  async (req, res, next) => {
    // Query: Get the cart details
    const result = await getCartItemsByCartId(req.validatedCartId.cart_id);

    // Return the cart
    res.status(200).json(result);
  }
);

// Adds an item/multiple items to a specific cart
cartRouter.post(
  "/:cartId",
  checkUserAuthorization,
  validateCartIdInput,
  async (req, res, next) => {
    // Specify joi schema for a single item
    const itemSchema = Joi.object(
      {
        product_id: Joi.string().uuid().required(),
        quantity: Joi.number().integer().min(1).required(),
      },
      { stripUnknown: true }
    );
    // Specify joi schema for inputting all items
    const itemsSchema = Joi.object(
      {
        items: Joi.array().items(itemSchema).min(1).required(),
      },
      { stripUnknown: true }
    );

    // Validate the input
    const { value, error } = itemsSchema.validate(req.body);

    // Throw an error if there's an error
    if (error) {
      throw new HttpError("Invalid input data", 400);
    }

    // Query: Add items to the cart
    const result = await addItemsToCart(
      req.validatedCartId.cart_id,
      value.items
    );

    // Return the updated cart
    res.status(201).json(result);
  }
);

// Updates the quantity of an item in a specific cart
cartRouter.put("/:cartId/:productId", async (req, res, next) => {});

// Deletes an item from a specific cart
cartRouter.delete("/:cartId/:productId", async (req, res, next) => {});

// Checks out a specific cart
cartRouter.post("/:cartId/checkout", async (req, res, next) => {});

// Checks if the user is a customer or an admin
function checkUserAuthorization(req, res, next) {
  // Get the role_id from the JWT
  const { role_name } = req.user;

  // Throw an error if the user is not a customer
  if (role_name !== "Customer") {
    throw new HttpError("Unauthorized", 401);
  }

  // Move to the next middleware
  next();
}

function validateCartIdInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object(
    {
      cart_id: Joi.string().uuid().required(),
    },
    { stripUnknown: true }
  );

  // Validate the input
  const { value, error } = schema.validate({
    cart_id: req.params.cartId,
  });

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Invalid input data", 400);
  }

  // Query: Validate the cart ID
  const isValid = validateCartIdByUserId(value.cart_id, req.user.user_id);

  if (!isValid) {
    throw new HttpError("Unauthorized", 401);
  }

  // Save the validated cart ID in the request
  req.validatedCartId = value;

  // Move to the next middleware
  next();
}

module.exports = cartRouter;
