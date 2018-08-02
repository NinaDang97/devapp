import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Test from './components/Test';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
