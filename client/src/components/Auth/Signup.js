import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';

import Navbar from '../Navbar';
import Error from '../Error';

export default class Signup extends Component {
  state = {
    errors: {}
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const { name, email, password } = this.state;
    const newUser = {
      name,
      email,
      password
    };

    axios
      .post('/api/users/signup', newUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data));
  };

  render() {
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
              {/* {Object.values(this.state.errors).length > 0 && <Error />} */}
            </Form.Field>
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
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
