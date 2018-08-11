import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.currentUser.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="intro">
          <Link to="/signup">
            <Button inverted color="grey">
              Become a New Member!
            </Button>
          </Link>
          <Link to="/login">
            <Button inverted color="black">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  currentUser: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(Landing);
