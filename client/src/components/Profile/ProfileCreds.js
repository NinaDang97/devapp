import React from 'react';
import { Segment, Divider } from 'semantic-ui-react';
import moment from 'moment';

const ProfileCreds = ({ experience, education }) => {
  const expDisplay = (
    <Segment color="blue">
      <h3 style={Heading3}>Experience</h3>
      <Divider />

      {experience.map((exp, i) => (
        <Segment key={i}>
          <h3>{exp.company}</h3>
          <div>
            {moment(exp.from).format('L')} -{' '}
            {exp.to ? moment(exp.to).format('L') : <span>Now</span>}
          </div>
          <div>
            <strong>Position: </strong>
            {exp.title}
          </div>
          {exp.description ? (
            <div>
              <strong>Description: </strong>
              {exp.description}
            </div>
          ) : null}
        </Segment>
      ))}
    </Segment>
  );

  const eduDisplay = (
    <Segment color="green">
      <h3 style={Heading3}>Education</h3>
      <Divider />

      {education.map((edu, i) => (
        <Segment key={i}>
          <h3>{edu.school}</h3>
          <div>
            <strong>Degree: </strong>
            {edu.degree}
          </div>
          <div>
            <strong>Field: </strong>
            {edu.field}
          </div>
        </Segment>
      ))}
    </Segment>
  );

  return (
    <div>
      {experience.length > 0 ? expDisplay : <div>No Experience Listed</div>}
      {education.length > 0 ? eduDisplay : <div>No Education Listed</div>}
    </div>
  );
};

const Heading3 = {
  textAlign: 'center'
};

export default ProfileCreds;
