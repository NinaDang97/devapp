import React from 'react';
import { Message, Icon } from 'semantic-ui-react';

const Error = props => {
  return (
    <div>
      <Message negative>
        <p>
          <Icon name="warning circle" />
          {props.error}
        </p>
      </Message>
    </div>
  );
};

export default Error;
