import React from 'react';
import { Message } from 'semantic-ui-react';

export default (Error = props => {
  return (
    <div>
      <Message negative>
        <p>Invalid</p>
      </Message>
    </div>
  );
});
