const validator = require('validator');
const _ = require('lodash');

//validate name, email, password
const validateSignupInput = (data) => {
    let errors = {};
    const { name, email, password } = data;

    if(!validator.isLength(name, {min: 5, max: 30})){
        errors.name = 'Name must be between 5 and 30 characters';
    }
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

module.exports = validateSignupInput;