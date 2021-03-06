const validator = require('validator');
const _ = require('lodash');

//validate name, email, password
const validateSignupInput = data => {
  const errors = {};
  const { name, email, password } = data;

  if (_.isEmpty(name)) {
    errors.name = 'Name field is required';
  } else if (!validator.isLength(name, { min: 5, max: 30 })) {
    errors.name = 'Name must be between 5 and 30 characters';
  }
  if (_.isEmpty(email)) {
    errors.email = 'Email address is required';
  } else if (!validator.isEmail(email)) {
    errors.email = 'Email address is not valid';
  }
  if (_.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors) //returns true if empty (null, undefined, empty obj, array)
  };
};

module.exports = validateSignupInput;
