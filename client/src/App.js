import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Test from './components/Test';
import Landing from './components/Landing';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';

import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import CreateProfile from './components/Form/CreateProfile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/developers" component={Test} />

          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/createprofile" component={CreateProfile} />
        </Switch>
      </div>
    );
  }
}

export default App;
