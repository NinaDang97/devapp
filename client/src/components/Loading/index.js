import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

const Loading = () => (
  <Segment>
    <Dimmer active inverted>
      <Loader size="massive">Loading</Loader>
    </Dimmer>
  </Segment>
);

export default Loading;
