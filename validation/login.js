const validator = require('validator');
const _ = require('lodash');

//validate email, password
const validateLoginInput = (data) => {
    let errors = {};
    const { email, password } = data;

    if(!validator.isEmail(email)){
        errors.email = 'Email address is not valid';
    }
    if(_.isEmpty(password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors, 
        isValid: _.isEmpty(errors) //returns true if empty (null, undefined, empty obj, array)
    };

}

module.exports = validateLoginInput;