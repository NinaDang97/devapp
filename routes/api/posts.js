const express = require('express');
const router = express.Router();
const middleware = require('../../middleware');

const Post = require('../../models/Post');
const User = require('../../models/User');

const validatePostInput = require('../../validation/post');
const postError = require('../../error/post');

router.get('/test', (req, res) => {
  res.json({
    msg: 'Posts works'
  });
});

// @route   GET api/posts
// @desc    Get all posts
// @access  public
router.get('/', (req, res) => {
  const errors = {};

  Post.find({})
    .sort({ date: -1 })
    .then(allPosts => {
      if (!allPosts) {
        errors.no_post = postError.no_posts;
        return res.status(404).json(errors);
      }

      res.json(allPosts);
    })
    .catch(() => {
      errors.no_post = postError.no_posts;
      return res.status(404).json(errors);
    });
});

// @route   GET api/posts/:post_id
// @desc    Get specific post
// @access  public
router.get('/:post_id', (req, res) => {
  const errors = {};

  const { post_id } = req.params;
  Post.findById(post_id)
    .then(post => res.json(post))
    .catch(() => {
      errors.no_post = postError.no_post;
      return res.status(404).json(errors);
    });
});

// @route   POST api/posts
// @desc    Create user's post
// @access  private
router.post('/', middleware.isLoggedIn, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = {
    ...req.body, //text, name, avatar
    author: req.user._id
  };

  Post.create(newPost)
    .then(post => res.json(post))
    .catch(err => res.status(400).json(err));
});

// @route   DELETE api/posts/:post_id
// @desc    Delete user's specific post
// @access  private
router.delete('/:post_id', middleware.isLoggedIn, (req, res) => {
  const errors = {};

  const { post_id } = req.params;
  const { _id } = req.user;

  Post.findById(post_id)
    .then(post => {
      if (!post) {
        errors.no_post = postError.no_post;
        return res.status(404).json(errors);
      }

      //check ownership of the post
      User.findById(_id).then(user => console.log(user._id));

      // if (post.author.toString() !== _id) {
      //   errors.ownership_post = postError.ownership_post;
      //   return res.status(400).json(errors);
      // }

      // Post.remove({ _id: post_id });
      // Post.save().then(posts => res.json(posts));
    })
    .catch(() => res.status(400));
});

module.exports = router;
