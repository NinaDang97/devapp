import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import Navbar from '../Navbar';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <Navbar />
        <div className="intro">
          <Link to="/signup">
            <Button inverted color="grey">
              Become a New Member!
            </Button>
          </Link>
          <Link to="/login">
            <Button inverted color="black">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
