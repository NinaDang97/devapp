import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { getCurrentProfile } from '../../action';
import { connect } from 'react-redux';

import Navbar from '../Navbar';
import Loader from '../Loading';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { currentUser } = this.props.currentUser;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Loader />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <h3>TODO: display profile</h3>;
          </div>
        );
      } else {
        dashboardContent = (
          <Segment>
            <Link to="/createprofile">
              <Button floated="left" primary>
                Create Profile
              </Button>
            </Link>
            <Divider clearing />
            <h3>Welcome {currentUser.name}</h3>
            No profile setup yet
          </Segment>
        );
      }
    }
    return (
      <div>
        <Navbar />
        <h1>Dashboard</h1>
        {dashboardContent}
      </div>
    );
  }
}

Dashboard.propTypes = {
  currentUser: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth,
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
