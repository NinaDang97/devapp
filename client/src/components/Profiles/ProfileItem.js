import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Label, Button, Icon, Header } from 'semantic-ui-react';
import moment from 'moment';

const ProfileItem = props => {
  return (
    <Card className="developer-item">
      <Image src={props.author.avatar} />
      <Card.Content>
        <Card.Header>{props.author.name}</Card.Header>
        <Card.Meta>
          <span className="date">
            Joined {moment(props.author.date).fromNow()}
          </span>
        </Card.Meta>
        <Card.Description>
          <Header as="h4">{props.status.toUpperCase()}</Header>
          <p>
            {props.company ? (
              <span>
                <Icon name="laptop" />
                {props.company}
              </span>
            ) : null}{' '}
          </p>
          <p>
            {props.location ? (
              <span>
                <Icon name="map marker alternate" />
                {props.location}
              </span>
            ) : null}{' '}
          </p>
          <Label.Group circular>
            {props.skills.map((skill, i) => (
              <Label key={i} as="a">
                {skill}
              </Label>
            ))}
          </Label.Group>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={'/view-profile/' + props.handle}>
          <Button fluid color="blue">
            View Profile
          </Button>
        </Link>
      </Card.Content>
    </Card>
  );
};

export default ProfileItem;
