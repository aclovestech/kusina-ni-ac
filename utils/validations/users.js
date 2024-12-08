// Joi
const Joi = require("joi");
// HttpError
const HttpError = require("../HttpError");
// DB (Knex)
const { getUserByUserId } = require("../../db/db-users");

// Validates the input for user query
function validateUserQueryInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object({
    role_name: Joi.string().required(),
    perPage: Joi.number().required(),
    currentPage: Joi.number().required(),
  });

  // Validate the input
  const { value, error } = schema.validate({
    role_name: req.query.role_name.toLowerCase(),
    perPage: req.query.perPage,
    currentPage: req.query.currentPage,
  });

  // Throw an error if there's an error
  if (error) throw new HttpError("Missing required data", 400);

  // Save the validated input in the request
  req.validatedUserQueryInput = value;

  // Move to the next middleware
  next();
}

// Checks if the user is trying to access the same user or an admin
function validateUserAuthorization(req, res, next) {
  // Get the user_id from the JWT
  const { user_id } = req.user;
  // Get the userId from the params
  const { userId } = req.params;

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

// Extracts the user details from the input
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

// Validates the input for a new address
function validateNewAddressDetailsInput(req, res, next) {
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

// Validates the input for address details to be updated
function validateUpdatedAddressDetailsInput(req, res, next) {
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

module.exports = {
  validateUserQueryInput,
  validateUserAuthorization,
  validateUserIdInput,
  extractUserDetailsFromInput,
  validateNewAddressDetailsInput,
  validateUpdatedAddressDetailsInput,
  validateAddressIdInput,
};
