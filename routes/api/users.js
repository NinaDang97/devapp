const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const middleware = require('../../middleware');
const key = require('../../config/keys').secretOrKey;

const User = require('../../models/User');

const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');

router.get('/signup', (req, res) =>
  res.json({ msg: 'User Signup Route works' })
);

// @route   GET api/users/signup
// @desc    Signup user
// @access  Public
router.post('/signup', (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { name, email, password } = req.body;
  //Find email if exists or not in db
  User.findOne({ email }) //returns null if not found
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        //status code 400: Bad Request
        return res.status(400).json(errors);
      } else {
        //take avatar from gmail and convert into url
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
        //declare new user obj
        const newUser = {
          name,
          email,
          password,
          avatar
        };
        //encrypt password
        bcrypt.genSalt(10, (err, salt) => {
          //take your pw, return a new hashed pw
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash; //assign new hashed pw to obj's pw
            //add new user to the db
            User.create(newUser)
              .then(addedUser => res.json(addedUser))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @route   GET api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  //Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      //user is NOT found
      //status code 404 NOT FOUND
      errors.email = 'User email is not found!';
      return res.status(404).json(errors);
    }

    //if user is found
    //Check PW
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        errors.password = 'Password is not correct!';
        return res.status(400).json(errors);
      } else {
        //User Matched
        //Create JWT payload
        const payload = {
          _id: user._id,
          name: user.name,
          avatar: user.avatar
        };

        //Sign Token
        jwt.sign(payload, key, { expiresIn: '3hr' }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        });
      }
    });
  });
});

// @route   GET api/users/currentUser
// @desc    Return current user
// @access  Private
//Passport.authenticate() receives strategy: e.g. jwt (passport-jwt), local (passport-local)...
router.get(
  '/currentuser',
  middleware.isLoggedIn, //passport.authenticate() returns new property req.user
  (req, res) => {
    const { _id, name, email } = req.user;
    const userInfo = { _id, name, email };
    res.json(userInfo);
  }
);

module.exports = router;
