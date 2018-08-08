import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { Button, Form, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logInUser } from '../../action';

import Navbar from '../Navbar';
import Error from '../Error';

class Login extends Component {
  state = {
    errors: {}
  };

  componentDidMount() {
    if (this.props.currentUser.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

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

    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    this.props.logInUser(user, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar />

        <div className="form">
          <Header as="h2" className="header">
            Log In Form
          </Header>
          <Form>
            <Form.Field>
              <label>Email</label>
              <Input
                type="text"
                name="email"
                onChange={this.handleChange}
                placeholder="Email"
              />
              {errors.email ? <Error error={errors.email} /> : null}
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input
                type="password"
                name="password"
                onChange={this.handleChange}
                placeholder="Password"
              />
              {errors.password ? <Error error={errors.password} /> : null}
            </Form.Field>

            <Button type="submit" onClick={this.handleSubmit}>
              Go!
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  logInUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.error,
    currentUser: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logInUser }
)(Login);
