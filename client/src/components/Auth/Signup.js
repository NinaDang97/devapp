import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Navbar from '../Navbar';
import Error from '../Error';
import { signUpUser } from '../../action';

class Signup extends Component {
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

  handleSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;
    const newUser = {
      name,
      email,
      password
    };

    this.props.signUpUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar />

        <div className="form">
          <Header as="h2" className="header">
            Sign Up Form
            <Header.Subheader>
              Create your own account to get interacted with other members.
            </Header.Subheader>
          </Header>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                placeholder="Name"
              />
              {errors.name ? <Error error={errors.name} /> : null}
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                type="text"
                name="email"
                onChange={this.handleChange}
                placeholder="Email"
              />
              {errors.email ? <Error error={errors.email} /> : null}
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                placeholder="Password"
              />
              {errors.password ? <Error error={errors.password} /> : null}
            </Form.Field>

            <Button type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.error
  };
};

export default connect(
  mapStateToProps,
  { signUpUser }
)(Signup);
