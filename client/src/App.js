import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

// import Test from './components/Test';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Profiles from './components/Profiles';
import Profile from './components/Profile';

import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import CreateProfile from './components/Form/CreateProfile';
import EditProfile from './components/Form/EditProfile';
import AddExperience from './components/Form/AddExperience';
import AddEducation from './components/Form/AddEducation';
import Posts from './components/Posts';
import Post from './components/Post';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/developers" component={Profiles} />
          <Route exact path="/view-profile/:handle" component={Profile} />

          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <PrivateRoute exact path="/feed" component={Posts} />
          <PrivateRoute exact path="/post/:postId" component={Post} />
        </Switch>
      </div>
    );
  }
}

export default App;
