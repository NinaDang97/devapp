import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Feed, Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { deletePost, addLike, unLike } from '../../action';

class PostItem extends Component {
  handleLikes = _id => {
    let foundIndex = this.handleColorLikes();
    foundIndex !== 1 ? this.props.addLike(_id) : this.props.unLike(_id);
  };

  handleColorLikes = () => {
    let index = -1;
    this.props.likes.forEach(like => {
      if (like.author === this.props.user.currentUser._id) {
        index = 1;
      }
    });
    return index;
  };

  render() {
    const { _id, avatar, date, name, text, likes, comments } = this.props;
    const { currentUser } = this.props.user;

    return (
      <Feed.Event>
        <Feed.Label image={avatar} />
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{name}</Feed.User>
            <span> added a post</span>
            <Feed.Date>{moment(date).fromNow()}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>{text}</Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
              <Icon
                name="like"
                color={this.handleColorLikes() === 1 ? 'red' : 'grey'}
                onClick={() => this.handleLikes(_id)}
              />
              {likes.length}{' '}
              {likes.length > 1 ? <span> Likes</span> : <span> Like</span>}
            </Feed.Like>
            <Link to={`/post/${_id}`}>
              {comments.length}{' '}
              {comments.length > 1 ? (
                <span> Comments</span>
              ) : (
                <span> Comment</span>
              )}
            </Link>
            {currentUser._id === this.props.author ? (
              <Button
                circular
                icon="delete"
                onClick={() => this.props.deletePost(_id)}
              />
            ) : null}
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

PostItem.propTypes = {
  user: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  unLike: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(
  mapStateToProps,
  { deletePost, addLike, unLike }
)(PostItem);
