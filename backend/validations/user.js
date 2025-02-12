const createUserSchema = {
  username: {
    in: ["body"],
    isString: {
      errorMessage: "Name must be a string",
    },
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isLength: {
      options: { min: 4, max: 15 },
      errorMessage: "Name must be between 4 and 15 characters",
    },
  },
  password: {
    in: ["body"],
    isString: {
      errorMessage: "Password must be a string",
    },
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isLength: {
      options: { min: 3, max: 10 },
      errorMessage: "Password must be between 4 and 15 characters",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Email must be a valid email",
    },
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
  },
};

const updateUserSchema = {
  username: {
    in: ["body"],
    optional: true,
    isString: true,
    errorMessage: "Username should be a string",
  },
  password: {
    in: ["body"],
    optional: true,
    isString: true,
    errorMessage: "Password should be a string",
  },
  email: {
    in: ["body"],
    optional: true,
    isEmail: true,
    errorMessage: "Email should be a valid email address",
  },
};

export { createUserSchema, updateUserSchema };
