import React from 'react';
import { Divider, Segment, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile }) => {
  const bioDisplay = (
    <Segment color="violet">
      <h3 style={Heading3}>
        {profile.author.name.trim().split(' ')[0]}
        's Bio
        <Divider />
      </h3>
      {profile.bio}
    </Segment>
  );

  const skillsDisplay = (
    <Segment color="red">
      <h3 style={Heading3}>Skill Set</h3>
      <Divider />
      <Label.Group circular>
        {profile.skills.map((skill, i) => (
          <Label color="red" key={i} as="a">
            {skill}
          </Label>
        ))}
      </Label.Group>
    </Segment>
  );
  return (
    <div>
      {profile.bio ? <span>{bioDisplay}</span> : null}
      {skillsDisplay}
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

const Heading3 = {
  textAlign: 'center'
};

export default ProfileAbout;
