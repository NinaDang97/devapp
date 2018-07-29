const validator = require('validator');
const _ = require('lodash');

const validatePostInput = data => {
  const errors = {};

  if (_.isEmpty(data.text)) {
    errors.text = 'Text field is required!';
  } else if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};

module.exports = validatePostInput;
