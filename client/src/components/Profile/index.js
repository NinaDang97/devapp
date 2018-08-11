import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { getProfileByHandle } from '../../action';

import Loading from '../Loading';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';

class Profile extends Component {
  componentDidMount() {
    const { handle } = this.props.match.params;
    if (handle) {
      this.props.getProfileByHandle(handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    let profileDisplay;

    if (profile === null || loading) {
      profileDisplay = <Loading />;
    } else {
      profileDisplay = (
        <Container text>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            experience={profile.experience}
            education={profile.education}
          />
          {profile.github_username ? (
            <ProfileGithub username={profile.github_username} />
          ) : null}
        </Container>
      );
    }

    return <div>{profileDisplay}</div>;
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
