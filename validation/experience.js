const _ = require('lodash');

const validateExpInput = data => {
  const errors = {};

  const { title, company, from } = data;
  const requiredInputs = [
    { title: title },
    { company: company },
    { from: from }
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

module.exports = validateExpInput;
