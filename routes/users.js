// Express promise router
const Router = require("express-promise-router");
// HttpError
const HttpError = require("../utils/HttpError");
// Joi
const Joi = require("joi");
// DB (Knex)
const {
  getUsersByRoleName,
  getUserByUserId,
  updateUserByUserId,
  deleteUserByUserId,
  getUserAddressesByUserId,
  addNewAddressToUser,
  updateUserAddress,
  deleteUserAddress,
} = require("../db/db-users");

const usersRouter = new Router();

// Gets all users if the user is an admin
usersRouter.get("/", checkIsUserAdmin, async (req, res, next) => {
  // Specify joi schema
  const schema = Joi.object({
    role_name: Joi.string().required(),
    perPage: Joi.number().required(),
    currentPage: Joi.number().required(),
  });

  // Validate the input
  const { value, error } = schema.validate({
    role_name: req.body.role_name.toLowerCase(),
    perPage: req.body.perPage,
    currentPage: req.body.currentPage,
  });

  // Throw an error if there's an error
  if (error) throw new HttpError("Missing required data", 400);

  // Query: Get all users
  const result = await getUsersByRoleName(value);

  // Throw an error if the result is empty
  if (result.length === 0) throw new HttpError("No users found", 404);

  // Return the users
  res.status(200).json(result);
});

// Gets a specific user
usersRouter.get(
  "/:userId",
  checkUserAuthorization,
  validateUserIdInput,
  async (req, res, next) => {
    // Query: Get the user details
    const result = await getUserByUserId(req.validatedUserId.user_id);

    // Return the user details
    res.status(200).json(result);
  }
);

// Updates a specific user
usersRouter.put(
  "/:userId",
  checkUserAuthorization,
  validateUserIdInput,
  extractUserDetailsFromInput,
  async (req, res, next) => {
    // Query: Update the user details
    const result = await updateUserByUserId(
      req.validatedUserId.user_id,
      req.userDetails
    );

    // Return the user details
    res.status(201).json(result);
  }
);

// Deletes a specific user
usersRouter.delete(
  "/:userId",
  checkIsUserAdmin,
  validateUserIdInput,
  async (req, res, next) => {
    // Query: Delete the user
    await deleteUserByUserId(req.validatedUserId.user_id);

    // Return that the user was deleted
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  }
);

// Gets all user addresses
usersRouter.get(
  "/:userId/addresses",
  checkUserAuthorization,
  validateUserIdInput,
  async (req, res, next) => {
    // Query: Get the user's addresses
    const result = await getUserAddressesByUserId(req.validatedUserId.user_id);

    // Return the data from the response
    res.status(200).json(result);
  }
);

// Adds a new user address
usersRouter.post(
  "/:userId/addresses",
  checkUserAuthorization,
  validateUserIdInput,
  validateNewAddressInput,
  async (req, res, next) => {
    // Query: Create a new row for the address
    const result = await addNewAddressToUser(
      req.validatedUserId.user_id,
      req.validatedNewAddress
    );

    // Return the newly created address
    res.status(201).json(result);
  }
);

// Updates a specific user address
usersRouter.put(
  "/:userId/addresses/:addressId",
  checkUserAuthorization,
  validateUserIdInput,
  validateAddressIdInput,
  validateAddressDetailsInput,
  async (req, res, next) => {
    // Query: Update the address
    const result = await updateUserAddress(
      req.validatedUserId.user_id,
      req.validatedAddressId.address_id,
      req.validatedAddressDetails
    );

    // Return the updated address
    res.status(200).json(result);
  }
);

// Deletes a specific user address
usersRouter.delete(
  "/:userId/addresses/:addressId",
  checkUserAuthorization,
  validateUserIdInput,
  validateAddressIdInput,
  async (req, res, next) => {
    // Query: Delete the address
    await deleteUserAddress(
      req.validatedUserId.user_id,
      req.validatedAddressId.address_id
    );

    // Return that the address was deleted successfully
    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  }
);

// Checks if the user is an admin
function checkIsUserAdmin(req, res, next) {
  // Get the role_id from the JWT
  const { role_name } = req.user;

  // Throw an error if the user is not a seller
  if (role_name !== "Admin") throw new HttpError("Unauthorized", 401);

  // Move to the next middleware
  next();
}

// Checks if the user is trying to access the same user or an admin
function checkUserAuthorization(req, res, next) {
  // Get the user_id from the JWT
  const { user_id, role_name } = req.user;
  // Get the userId from the params
  const { userId } = req.params;

  // Move to the next middleware if the user is an admin
  if (role_name.toLowerCase() === "admin") return next();

  // Throw an error if the user is asking for a different user
  if (user_id !== userId) {
    console.error(
      `User with id ${user_id} is trying to access user with id ${userId}`
    );
    throw new HttpError("Unauthorized", 401);
  }

  // Move to the next middleware
  next();
}

// Validates the input for user ID
function validateUserIdInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object({
    user_id: Joi.string().uuid().required(),
  });

  // Validate the input
  const { value, error } = schema.validate(
    {
      user_id: req.params.userId,
    },
    { stripUnknown: true }
  );

  // Throw an error if there's an error
  if (error) throw new HttpError("Invalid user ID", 404);

  // Save the validated user ID in the request
  req.validatedUserId = value;

  // Move to the next middleware
  next();
}

async function extractUserDetailsFromInput(req, res, next) {
  // Specify joi schema
  const baseSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
  }).optional();
  const customerSchema = Joi.object({
    dateOfBirth: Joi.date(),
    sex: Joi.string().valid("male", "female"),
    loyalty_points: Joi.number(),
  }).optional();
  const sellerSchema = Joi.object({
    phone_number: Joi.string().length(15),
    business_name: Joi.string(),
    description: Joi.string(),
  }).optional();
  const adminSchema = Joi.object({}).optional();

  // Get role_id from the DB
  const { role_id } = await getUserByUserId(req.validatedUserId.user_id);

  // Set the schema based on the role ID
  let schema;
  switch (role_id) {
    case 1:
      schema = adminSchema;
      break;
    case 2:
      schema = sellerSchema;
      break;
    case 3:
      schema = customerSchema;
      break;
  }

  // Validate the input
  const baseUpdates = baseSchema.validate(req.body, { stripUnknown: true });
  const detailedUpdates = schema.validate(req.body, { stripUnknown: true });

  // Throw an error if there's an error
  if (baseUpdates.error || detailedUpdates.error) {
    throw new HttpError("Invalid input data", 400);
  }

  // Throw an error if both the base and detailed updates are empty
  if (
    Object.keys(baseUpdates.value).length === 0 &&
    Object.keys(detailedUpdates.value).length === 0
  ) {
    throw new HttpError("Please provide details to update", 400);
  }

  // Save the extracted user details in the request
  req.userDetails = {
    role_id: role_id,
    baseUpdates: baseUpdates.value,
    detailedUpdates: detailedUpdates.value,
  };

  // Move to the next middleware
  next();
}

function validateNewAddressInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object({
    address_line_1: Joi.string().required(),
    address_line_2: Joi.string(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipcode: Joi.string().required(),
    country: Joi.string().required(),
    phone_number: Joi.string().required(),
    is_default: Joi.boolean().valid(true, false),
  });

  // Validate the input
  const { value, error } = schema.validate(req.body, { stripUnknown: true });

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Invalid input data", 400);
  }

  // Save the validated address in the request
  req.validatedNewAddress = value;

  // Move to the next middleware
  next();
}

function validateAddressDetailsInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object({
    address_line_1: Joi.string(),
    address_line_2: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zipcode: Joi.string(),
    country: Joi.string(),
    phone_number: Joi.string(),
    is_default: Joi.boolean().valid(true, false).default(false),
  });

  // Validate the input
  const { value, error } = schema.validate(req.body, { stripUnknown: true });

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Invalid input data", 400);
  }

  // Save the validated address in the request
  req.validatedAddressDetails = value;

  // Move to the next middleware
  next();
}

function validateAddressIdInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object({
    address_id: Joi.string().uuid().required(),
  });

  // Validate the input
  const { value, error } = schema.validate(
    { address_id: req.params.addressId },
    {
      stripUnknown: true,
    }
  );

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Invalid input data", 400);
  }

  // Save the validated address in the request
  req.validatedAddressId = value;

  // Move to the next middleware
  next();
}

module.exports = usersRouter;
