const _ = require('lodash');

const validateEduInput = data => {
  const errors = {};

  const { school, degree, field } = data;
  const requiredInputs = [
    { school: school },
    { degree: degree },
    { field: field }
  ];

  requiredInputs.forEach(val => {
    const key = Object.keys(val)[0];
    const value = val[key];
    if (_.isEmpty(value)) {
      errors[key] = `${key} field is required!`;
    }
  });

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};

module.exports = validateEduInput;
