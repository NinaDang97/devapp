import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Feed, Container } from 'semantic-ui-react';

import { connect } from 'react-redux';
import CreatePost from '../Form/CreatePost';
import Loading from '../Loading';
import { getAllPosts } from '../../action';

import PostItem from './PostItem';

class Posts extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    const { allPosts, loading } = this.props.post;
    let postContent;
    if (allPosts === null || loading) {
      postContent = <Loading />;
    } else {
      postContent = allPosts.map((post, i) => <PostItem key={i} {...post} />);
    }

    return (
      <div>
        <CreatePost />
        <Container text>
          <Feed>{postContent}</Feed>
        </Container>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getAllPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.post
  };
};

export default connect(
  mapStateToProps,
  { getAllPosts }
)(Posts);
