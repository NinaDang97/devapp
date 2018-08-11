import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Form, Select, Input } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import Navbar from '../Navbar';
import Error from '../Error';
import * as data from '../../data';
import { createProfile } from '../../action';

class CreateProfile extends Component {
  state = {
    errors: {}
  };

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  handleChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newProfile = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      github_username: this.state.github_username,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(newProfile, this.props.history);
  };

  render() {
    const { errors } = this.state;
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
              {errors.handle ? <Error error={errors.handle} /> : null}
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
              {errors.status ? <Error error={errors.status} /> : null}
            </Form.Field>
            <Form.Field>
              <label>Skills*</label>
              <Input
                type="text"
                name="skills"
                onChange={this.handleChange}
                placeholder="Skills"
              />
              {errors.skills ? <Error error={errors.skills} /> : null}
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
              {errors.linkedin ? <Error error={errors.linkedin} /> : null}
              <Input
                icon="facebook f"
                iconPosition="left"
                type="text"
                name="facebook"
                onChange={this.handleChange}
                placeholder="Facebook URL"
              />
              {errors.facebook ? <Error error={errors.facebook} /> : null}
              <Input
                icon="twitter"
                iconPosition="left"
                type="text"
                name="twitter"
                onChange={this.handleChange}
                placeholder="Twitter URL"
              />
              {errors.twitter ? <Error error={errors.twitter} /> : null}
              <Input
                icon="instagram"
                iconPosition="left"
                type="text"
                name="instagram"
                onChange={this.handleChange}
                placeholder="Instagram URL"
              />
              {errors.instagram ? <Error error={errors.instagram} /> : null}
              <Input
                icon="youtube"
                iconPosition="left"
                type="text"
                name="youtube"
                onChange={this.handleChange}
                placeholder="Youtube URL"
              />
              {errors.youtube ? <Error error={errors.youtube} /> : null}
            </Form.Field>

            <Button type="submit" onClick={this.handleSubmit}>
              Create
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.error
  };
};

export default connect(
  mapStateToProps,
  { createProfile }
)(CreateProfile);
