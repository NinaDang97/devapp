const express = require("express");
const router = express.Router();
const middleware = require("../../middleware");

const Post = require("../../models/Post");
const User = require("../../models/User");

const validatePostInput = require("../../validation/post");
const postError = require("../../error/post");

router.get("/test", (req, res) => {
  res.json({
    msg: "Posts works"
  });
});

// @route   GET api/posts
// @desc    Get all posts
// @access  public
router.get("/", (req, res) => {
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
router.get("/:post_id", (req, res) => {
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
router.post("/", middleware.isLoggedIn, (req, res) => {
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
router.delete("/:post_id", middleware.isLoggedIn, (req, res) => {
  const errors = {};

  const { post_id } = req.params; //string type
  const { _id } = req.user; //string type

  Post.findById(post_id)
    .then(post => {
      //check ownership of the post
      User.findById(_id).then(user => {
        //both are object types and convert to string
        if (user._id.toString() !== post.author.toString()) {
          errors.ownership_post = postError.ownership_post;
          return res.status(401).json(errors);
        }
        post.remove();
        post.save().then(posts => res.json({ success: true }));
      });
    })
    .catch(() => {
      errors.no_post = postError.no_posts;
      res.status(400).json(errors);
    });
});

// @route   POST api/posts/like/:post_id
// @desc    Like any post
// @access  private (need to be logged in)
router.post("/like/:post_id", middleware.isLoggedIn, (req, res) => {
  const errors = {};

  const { post_id } = req.params;
  Post.findById(post_id)
    .then(post => {
      const userLike = req.user._id;
      JSON.stringify(post.likes).indexOf(JSON.stringify(userLike)) === -1
        ? post.likes.unshift({ author: userLike })
        : null;
      post.save().then(savedPost => res.json(savedPost));
    })
    .catch(() => {
      errors.no_post = postError.no_posts;
      res.status(400).json(errors);
    });
});

// @route   POST api/posts/unlike/:post_id
// @desc    Unlike any liked post
// @access  private (need to be logged in)
router.post("/unlike/:post_id", middleware.isLoggedIn, (req, res) => {
  const errors = {};

  const { post_id } = req.params;
  Post.findById(post_id)
    .then(post => {
      const userLike = req.user._id;
      const userLikeId = post.likes.filter(
        val => val.author.toString() === userLike.toString()
      );
      JSON.stringify(post.likes).indexOf(JSON.stringify(userLike)) !== -1
        ? post.likes.remove({ _id: userLikeId[0] }) //remove only takes _id and object written to db already
        : null;
      post.save().then(savedPost => res.json(savedPost));
    })
    .catch(() => {
      errors.no_post = postError.no_posts;
      res.status(400).json(errors);
    });
});

// @route   POST api/posts/comment/:post_id
// @desc    Add comment to post
// @access  private
router.post("/comment/:post_id", middleware.isLoggedIn, (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { post_id } = req.params;

  Post.findById(post_id)
    .then(post => {
      const newComment = {
        ...req.body,
        author: req.user._id
      };

      post.comments.push(newComment);
      post.save().then(savedPost => res.json(savedPost));
    })
    .catch(() => {
      errors.no_post = postError.no_post;
      return res.status(400).json(errors);
    });
});

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete comment to post
// @access  private
router.delete(
  "/comment/:post_id/:comment_id",
  middleware.isLoggedIn,
  (req, res) => {
    const errors = {};
    const { post_id, comment_id } = req.params;
    const { _id } = req.user;

    Post.findById(post_id)
      .then(post => {
        //check post's comment exists
        const postComment = post.comments.filter(
          val => val._id.toString() === comment_id.toString()
        );

        if (postComment.length === 0) {
          errors.not_commented = postError.not_commented;
          return res.status(404).json(errors);
        }

        //check ownership of the post or comment
        if (
          _id.toString() === post.author.toString() ||
          _id.toString() === postComment[0].author.toString()
        ) {
          post.comments.remove({ _id: postComment[0]._id });
          post.save(savedPost => res.json(savedPost));
        } else {
          errors.ownership_post = postError.ownership_post;
          return res.status(400).json(errors);
        }
      })
      .catch(() => {
        errors.no_post = postError.no_post;
        return res.status(404).json(errors);
      });
  }
);

module.exports = router;
