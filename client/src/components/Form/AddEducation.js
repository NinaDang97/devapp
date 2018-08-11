import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Form, Input } from 'semantic-ui-react';

import { connect } from 'react-redux';

import Error from '../Error';
import { addEducation } from '../../action';

class AddEducation extends Component {
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

    const newEdu = {
      school: this.state.school,
      degree: this.state.degree,
      field: this.state.field
    };

    this.props.addEducation(newEdu, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="form form-profile">
        <Header as="h2" className="header">
          Add Education
        </Header>
        <Form>
          <Form.Field>
            <label>School*</label>
            <Input
              type="text"
              name="school"
              onChange={this.handleChange}
              placeholder="School"
            />
            {errors.school ? <Error error={errors.school} /> : null}
          </Form.Field>
          <Form.Field>
            <label>Degree*</label>
            <Input
              type="text"
              name="degree"
              onChange={this.handleChange}
              placeholder="Degree"
            />
            {errors.degree ? <Error error={errors.degree} /> : null}
          </Form.Field>
          <Form.Field>
            <label>Field*</label>
            <Input
              type="text"
              name="field"
              onChange={this.handleChange}
              placeholder="Field of study"
            />
            {errors.field ? <Error error={errors.field} /> : null}
          </Form.Field>

          <Button type="submit" onClick={this.handleSubmit}>
            Add
          </Button>
        </Form>
      </div>
    );
  }
}

AddEducation.propTypes = {
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.error
  };
};

export default connect(
  mapStateToProps,
  { addEducation }
)(AddEducation);
