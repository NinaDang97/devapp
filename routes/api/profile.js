const express = require('express');
const router = express.Router();

const middlware = require('../../middleware');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const profileError = require('../../error/profile');
const validateProfileInput = require('../../validation/profile');
const validateExpInput = require('../../validation/experience');
const validateEduInput = require('../../validation/education');

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
        errors.no_profile = profileError.no_current_profile;
        return res.status(404).json(errors);
      }
      res.json(foundProfile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/all
// @desc    get all profiles
// @access  public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find({})
    .populate('author', ['name', 'avatar', 'date'])
    .then(allProfiles => {
      if (!allProfiles) {
        errors.no_profile = profileError.no_profiles;
        return res.status(404).json(errors);
      }
      res.json(allProfiles);
    })
    .catch(err => res.status(400).json(err));
});

// @route   GET api/profile/handle/:handle
// @desc    get profile by handle
// @access  public
router.get('/handle/:handle', (req, res) => {
  const { handle } = req.params;
  const errors = {};
  Profile.findOne({ handle })
    .populate('author', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.no_profile = profileError.no_profile;
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/handle/:handle
// @desc    get profile by handle
// @access  public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  const { user_id } = req.params;
  Profile.findOne({ author: user_id })
    .populate('author', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.no_profile = profileError.no_profile;
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      errors.no_profile = profileError.no_profile;
      return res.status(404).json(err);
    });
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
          res.status(400).json(errors);
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

// @route   POST api/profile/experience
// @desc    Add experience to current profile
// @access  private
router.post('/experience', middlware.isLoggedIn, (req, res) => {
  const { errors, isValid } = validateExpInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { _id } = req.user;

  Profile.findOne({ author: _id }).then(profile => {
    const newExp = { ...req.body };

    //Add new exp to exp array
    profile.experience.unshift(newExp);
    profile.save(); //!IMPORTANT
    res.json(profile);
  });
});

// @route   POST api/profile/education
// @desc    Add education to current profile
// @access  private
router.post('/education', middlware.isLoggedIn, (req, res) => {
  const { errors, isValid } = validateEduInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { _id } = req.user;

  Profile.findOne({ author: _id })
    .then(profile => {
      const newEdu = { ...req.body };

      //Add new edu to edu array
      profile.education.unshift(newEdu);
      profile
        .save() //!IMPORTANT
        .then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    delete exp from profile
// @access  private
router.delete('/experience/:exp_id', middlware.isLoggedIn, (req, res) => {
  const { exp_id } = req.params;
  const { _id } = req.user;
  Profile.findOne({ author: _id })
    .then(profile => {
      profile.experience.remove({ _id: exp_id });
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile/education/:exp_id
// @desc    delete edu from profile
// @access  private
router.delete('/education/:edu_id', middlware.isLoggedIn, (req, res) => {
  const { edu_id } = req.params;
  const { _id } = req.user;
  Profile.findOne({ author: _id })
    .then(profile => {
      profile.education.remove({ _id: edu_id });
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile
// @desc    delete user and profile
// @access  private
router.delete('/', middlware.isLoggedIn, (req, res) => {
  const { _id } = req.user;
  Profile.findOneAndRemove({ author: _id })
    .then(() => {
      User.findByIdAndRemove(_id).then(() => {
        res.json({
          success: true
        });
      });
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
