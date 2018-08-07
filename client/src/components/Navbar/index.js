import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOutUser } from '../../action';

class Navbar extends Component {
  state = { activeItem: 'devapp' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { isAuthenticated, currentUser } = this.props.loggedInUser;

    const NonAuthNav = (
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
    );

    const AuthNav = (
      <Menu.Menu position="right">
        <Menu.Item
          as={Link}
          to="/"
          name="Log Out"
          active={activeItem === 'Log Out'}
          onClick={this.props.logOutUser}
        />
      </Menu.Menu>
    );

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
            to="/developers"
            name="developers"
            active={activeItem === 'developers'}
            onClick={this.handleItemClick}
          />

          {!isAuthenticated ? NonAuthNav : AuthNav}
        </Menu>
      </div>
    );
  }
}

Navbar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    loggedInUser: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logOutUser }
)(Navbar);
