const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const middlware = require('../../middleware');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Return testing route
// @access  public
router.get("/test", (req, res) => {
  res.json({
    msg: "Profile testing route works"
  });
});

// @route   GET api/profile
// @desc    Return current user's profile
// @access  private
router.get('/', middlware.isLoggedIn, (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user._id })
  .then(foundProfile => {
    if(!foundProfile){
      errors.no_profile = 'There is no profile';
      return res.status(404).json(errors);
    }
    res.json(foundProfile);
  })
  .catch(err => res.status(404).json(err))
})

// @route   POST api/profile
// @desc    Create user profile
// @access  private
router.post('/', middlware.isLoggedIn, (req, res) => {
  // author, handle, company, website, location, status, bio, github_username, 
  //skills, education, experience, social, date
  
  const { skills, education, experience, facebook, twitter, } = req.body;

  const profileInfo = {
      ...req.body,
      author: req.user._id,
      skills: skills.split(','),
      social: {
        facebook,
        twitter
      }
  }
  
  res.json(profileInfo);

})

module.exports = router;
