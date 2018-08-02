import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { Button, Form } from 'semantic-ui-react';

import Navbar from '../Navbar';

export default class Login extends Component {
  state = {
    errors: {}
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    console.log(user);
  };

  render() {
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
              <input
                type="text"
                name="email"
                onChange={this.handleChange}
                placeholder="Email"
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                placeholder="Password"
              />
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
