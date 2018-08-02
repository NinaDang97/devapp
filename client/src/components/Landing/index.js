import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

import Navbar from '../Navbar';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <Navbar />
        <div className="intro">
          <Button inverted color="grey">
            Become a New Member!
          </Button>
          <Button inverted color="black">
            Log In
          </Button>
        </div>
      </div>
    );
  }
}
