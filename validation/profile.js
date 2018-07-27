const validator = require('validator');
const _ = require('lodash');

//validate email, password
const validateProfileInput = data => {
  // author, handle*, company, website, location, status*, bio, github_username,
  //skills*, education, experience, social, date
  const errors = {};
  const {
    handle,
    status,
    skills,
    website,
    linkedin,
    facebook,
    twitter,
    instagram,
    youtube
  } = data;
  if (_.isEmpty(handle)) {
    errors.handle = 'Handle field is required';
  } else if (!validator.isLength(handle, { min: 3, max: 40 })) {
    errors.handle = 'Handle must be between 2 and 40 characters.';
  }
  if (_.isEmpty(status)) {
    errors.status = 'Status field is required';
  }
  if (_.isEmpty(skills)) {
    errors.skills = 'Skill field is required';
  }

  const social = [
    { website: website },
    { linkedin: linkedin },
    { facebook: facebook },
    { twitter: twitter },
    { instagram: instagram },
    { youtube: youtube }
  ];
  social.forEach(val => {
    const key = Object.keys(val)[0];
    const value = val[key];
    if (!_.isEmpty(value) && !validator.isURL(value)) {
      errors[key] = `${key} URL is not valid`;
    }
  });

  return {
    errors,
    isValid: _.isEmpty(errors) //returns true if empty (null, undefined, empty obj, array)
  };
};

module.exports = validateProfileInput;
