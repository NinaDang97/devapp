import React from 'react';
import PropTypes from 'prop-types';
import { Image, Header, Icon, Segment } from 'semantic-ui-react';

const ProfileHeader = ({ profile }) => {
  const SOCIAL_MEDIA_ARRAY = [
    'linkedin',
    'facebook',
    'twitter',
    'instagram',
    'youtube'
  ];

  const socialMediaDisplay = SOCIAL_MEDIA_ARRAY.map((item, i) => {
    return profile.social && profile.social[item] ? (
      <a key={i} href={profile.social[item]} target="_blank">
        <Icon name={item} />
      </a>
    ) : null;
  });

  return (
    <Segment>
      <Header as="h1" textAlign="center">
        <Image
          src={profile.author.avatar}
          style={{ width: '200px' }}
          circular
        />
        <Header.Content>{profile.author.name}</Header.Content>
        <Header.Subheader>
          <div>
            {profile.status}{' '}
            {profile.company ? <span>at {profile.company}</span> : null}
          </div>
          <div>{profile.location ? <span>{profile.location}</span> : null}</div>
          <div>
            {profile.website ? (
              <a href={profile.website} target="_blank">
                <Icon name="globe" />
              </a>
            ) : null}

            {socialMediaDisplay}
          </div>
        </Header.Subheader>
      </Header>
    </Segment>
  );
};

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
