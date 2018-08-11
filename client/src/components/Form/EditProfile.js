import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Form, Select, Input } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import _ from 'lodash';

import { connect } from 'react-redux';

import Error from '../Error';
import * as data from '../../data';
import { createProfile, getCurrentProfile } from '../../action';

class EditProfile extends Component {
  state = {
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    github_username: '',
    bio: '',
    linkedin: '',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    errors: {}
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }

    if (
      prevProps.currentProfile.profile !== this.props.currentProfile.profile
    ) {
      const { profile } = this.props.currentProfile;
      const skills = profile.skills.join(',');

      const social = _.isEmpty(profile.social) ? {} : profile.social;

      const linkedin = _.isEmpty(social.linkedin) ? '' : social.linkedin;
      const facebook = _.isEmpty(social.facebook) ? '' : social.facebook;
      const twitter = _.isEmpty(social.twitter) ? '' : social.twitter;
      const youtube = _.isEmpty(social.youtube) ? '' : social.youtube;
      const instagram = _.isEmpty(social.instagram) ? '' : social.instagram;

      this.setState({
        ...profile,
        skills,
        linkedin,
        facebook,
        twitter,
        youtube,
        instagram
      });
    }
  }

  handleChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const profile = {
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

    this.props.createProfile(profile, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="form form-profile">
        <Header as="h2" className="header">
          Edit Profile
        </Header>
        <Form>
          <Form.Field>
            <label>Profile handle*</label>
            <Input
              disabled
              type="text"
              name="handle"
              value={this.state.handle}
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
              value={this.state.company}
              onChange={this.handleChange}
              placeholder="Company"
            />
          </Form.Field>
          <Form.Field>
            <label>Website</label>
            <Input
              type="url"
              name="website"
              value={this.state.website}
              onChange={this.handleChange}
              placeholder="Website"
            />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <Input
              type="text"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
              placeholder="Location"
            />
          </Form.Field>
          <Form.Field>
            <label>Status*</label>
            <Select
              name="status"
              placeholder="Select your status"
              value={this.state.status}
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
              value={this.state.skills}
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
              value={this.state.bio}
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
              value={this.state.github_username}
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
              value={this.state.linkedin}
              onChange={this.handleChange}
              placeholder="LinkedIn URL"
            />
            {errors.linkedin ? <Error error={errors.linkedin} /> : null}
            <Input
              icon="facebook f"
              iconPosition="left"
              type="text"
              name="facebook"
              value={this.state.facebook}
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
              value={this.state.instagram}
              onChange={this.handleChange}
              placeholder="Instagram URL"
            />
            {errors.instagram ? <Error error={errors.instagram} /> : null}
            <Input
              icon="youtube"
              iconPosition="left"
              type="text"
              name="youtube"
              value={this.state.youtube}
              onChange={this.handleChange}
              placeholder="Youtube URL"
            />
            {errors.youtube ? <Error error={errors.youtube} /> : null}
          </Form.Field>

          <Button type="submit" onClick={this.handleSubmit}>
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  currentProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    currentProfile: state.profile,
    errors: state.error
  };
};

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(EditProfile);
