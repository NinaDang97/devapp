import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const ProfileActions = ({ handle }) => {
  return (
    <Button.Group>
      <Link to="/dashboard">
        <Button>Edit Credentials</Button>
      </Link>
      <Link to="/edit-profile">
        <Button>Edit Profile</Button>
      </Link>
      <Link to="/add-experience">
        <Button>Add Experience</Button>
      </Link>
      <Link to="/add-education">
        <Button>Add Education</Button>
      </Link>
      <Link to={'/view-profile/' + handle}>
        <Button>View Your Profile</Button>
      </Link>
    </Button.Group>
  );
};

export default ProfileActions;
