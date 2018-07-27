const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const middlware = require('../../middleware');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');

// @route   GET api/profile/test
// @desc    Return testing route
// @access  public
router.get('/test', (req, res) => {
  res.json({
    msg: 'Profile testing route works'
  });
});

// @route   GET api/profile
// @desc    Return current user's profile
// @access  private
router.get('/', middlware.isLoggedIn, (req, res) => {
  const errors = {};

  Profile.findOne({ author: req.user._id })
    .populate('author', ['name', 'avatar'])
    .then(foundProfile => {
      if (!foundProfile) {
        errors.no_profile = 'There is no profile';
        return res.status(404).json(errors);
      }
      res.json(foundProfile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile
// @desc    Create / Edit user profile
// @access  private
router.post('/', middlware.isLoggedIn, (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const {
    handle,
    skills,
    linkedin,
    facebook,
    twitter,
    instagram,
    youtube
  } = req.body;

  const { _id } = req.user;

  const profileInfo = {
    ...req.body,
    author: _id,
    skills: skills.split(','),
    social: {
      linkedin,
      facebook,
      twitter,
      instagram,
      youtube
    }
  };

  Profile.findOne({ author: _id }).then(profile => {
    //create new profile
    if (!profile) {
      //check if handle exists
      Profile.findOne({ handle }).then(foundProfile => {
        if (foundProfile) {
          errors.handle = 'that handle already exists';
          res.status(400).json({ handle: 'that handle already exists' });
        } else {
          Profile.create(profileInfo)
            .then(newProfile => res.json(newProfile))
            .catch(err => res.status(400).json(err));
        }
      });
    }
    //update existing profile
    else {
      //restricting author to edit the handle
      profileInfo.handle = profile.handle;
      Profile.findOneAndUpdate({ author: _id }, profileInfo, { new: true })
        .then(updatedProfile => res.json(updatedProfile))
        .catch(err => res.status(400).json(err));
    }
  });
});

module.exports = router;
