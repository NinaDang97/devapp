import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Header } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { createComment } from '../../action';

import Error from '../Error';

class CreateComment extends Component {
  state = {
    errors: {}
  };

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitComment = e => {
    e.preventDefault();

    const { currentUser } = this.props.user;

    const newComment = {
      text: this.state.text,
      name: currentUser.name,
      avatar: currentUser.avatar
    };
    this.props.createComment(this.props.postId, newComment);
  };

  render() {
    const { errors } = this.state;
    return (
      <Form>
        <Header color="teal" as="h2">
          Post Comment
        </Header>
        <Form.TextArea
          name="text"
          autoHeight
          placeholder="Comment your opinion (between 10 and 300 characters)"
          onChange={this.handleChange}
        />
        {errors.text ? <Error error={errors.text} /> : null}
        <Button type="submit" color="blue" onClick={this.submitComment}>
          Post
        </Button>
      </Form>
    );
  }
}

CreateComment.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth,
    errors: state.error
  };
};

export default connect(
  mapStateToProps,
  { createComment }
)(CreateComment);
