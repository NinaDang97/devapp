import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Form, Select, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import Navbar from '../Navbar';
import * as data from '../../data';

class CreateProfile extends Component {
  state = {
    handleSocialInputs: false,
    errors: {}
  };

  handleChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Navbar />

        {/* <Link to="/dashboard">
          <Button labelPosition="left" icon="left chevron" content="Back" />
        </Link> */}

        <div className="form form-profile">
          <Header as="h2" className="header">
            Create your own profile
            <Header.Subheader>
              Let's make your profile stand out.
            </Header.Subheader>
          </Header>
          <Form>
            <Form.Field>
              <label>Profile handle*</label>
              <Input
                type="text"
                name="handle"
                onChange={this.handleChange}
                placeholder="Handle"
              />
              {/* {errors.name ? <Error error={errors.name} /> : null} */}
            </Form.Field>
            <Form.Field>
              <label>Company</label>
              <Input
                type="text"
                name="company"
                onChange={this.handleChange}
                placeholder="Company"
              />
            </Form.Field>
            <Form.Field>
              <label>Website</label>
              <Input
                type="url"
                name="website"
                onChange={this.handleChange}
                placeholder="Website"
              />
            </Form.Field>
            <Form.Field>
              <label>Location</label>
              <Input
                type="text"
                name="location"
                onChange={this.handleChange}
                placeholder="Location"
              />
            </Form.Field>
            <Form.Field>
              <label>Status*</label>
              <Select
                name="status"
                placeholder="Select your status"
                options={data.statusOptions}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Skills*</label>
              <Input
                type="text"
                name="skills"
                onChange={this.handleChange}
                placeholder="Skills"
              />
              {/* {errors.name ? <Error error={errors.name} /> : null} */}
            </Form.Field>
            <Form.Field>
              <label>Bio</label>
              <Input
                type="text"
                name="bio"
                onChange={this.handleChange}
                placeholder="Bio"
              />
            </Form.Field>
            <Form.Field>
              <label>Github Username</label>
              <Input
                type="text"
                name="github_username"
                onChange={this.handleChange}
                placeholder="Github Username"
              />
            </Form.Field>
            <Form.Field>
              <label>Social Network URLs</label>
              <Input
                icon="linkedin in"
                iconPosition="left"
                type="text"
                name="linkedin"
                onChange={this.handleChange}
                placeholder="LinkedIn URL"
              />
              <Input
                icon="facebook f"
                iconPosition="left"
                type="text"
                name="facebook"
                onChange={this.handleChange}
                placeholder="Facebook URL"
              />
              <Input
                icon="twitter"
                iconPosition="left"
                type="text"
                name="twitter"
                onChange={this.handleChange}
                placeholder="Twitter URL"
              />
              <Input
                icon="instagram"
                iconPosition="left"
                type="text"
                name="instagram"
                onChange={this.handleChange}
                placeholder="Instagram URL"
              />
              <Input
                icon="youtube"
                iconPosition="left"
                type="text"
                name="youtube"
                onChange={this.handleChange}
                placeholder="Youtube URL"
              />
            </Form.Field>

            <Button type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth,
    profile: state.profile,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  null
)(CreateProfile);
