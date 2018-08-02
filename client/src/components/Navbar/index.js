import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  state = { activeItem: 'devapp' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div className="menu">
        <Menu pointing secondary>
          <Menu.Item
            as={Link}
            to="/"
            name="devapp"
            active={activeItem === 'devapp'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/test"
            name="developers"
            active={activeItem === 'developers'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/signup"
              name="Sign Up"
              active={activeItem === 'Sign Up'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={Link}
              to="/login"
              name="Log In"
              active={activeItem === 'Log In'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
