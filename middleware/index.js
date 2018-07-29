const passport = require('passport');

const middlewareObj = {};

middlewareObj.isLoggedIn = passport.authenticate('jwt', { session: false });

module.exports = middlewareObj;
