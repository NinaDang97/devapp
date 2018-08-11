import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Label, Segment, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';

import { deleteExp } from '../../action';

class Experience extends Component {
  render() {
    const DisplayDesc = ({ desc }) => (
      <Table.Row>
        <Table.Cell colSpan="5">
          <Segment padded>
            <Label attached="top left" color="blue" pointing>
              Description
            </Label>
            {desc}
          </Segment>
        </Table.Cell>
      </Table.Row>
    );

    const displayAllExp = this.props.experience.map(exp => (
      <Table.Body key={exp._id}>
        <Table.Row>
          <Table.Cell>{exp.title}</Table.Cell>
          <Table.Cell>{exp.company}</Table.Cell>
          <Table.Cell>{exp.location}</Table.Cell>
          <Table.Cell>
            {moment(exp.from).format('L')} -{' '}
            {exp.to ? moment(exp.to).format('L') : <span>Now</span>}
          </Table.Cell>
          <Table.Cell textAlign="right">
            <Button
              icon
              color="red"
              onClick={() => this.props.deleteExp(exp._id)}
            >
              <Icon name="delete" />
            </Button>
          </Table.Cell>
        </Table.Row>
        {exp.description ? <DisplayDesc desc={exp.description} /> : null}
      </Table.Body>
    ));

    let expTable;

    if (this.props.experience.length > 0) {
      expTable = (
        <Table color="blue" key="blue">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>Title</Table.HeaderCell>
              <Table.HeaderCell width={3}>Company</Table.HeaderCell>
              <Table.HeaderCell width={3}>Location</Table.HeaderCell>
              <Table.HeaderCell width={3}>Duration</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          {displayAllExp}
        </Table>
      );
    } else {
      expTable = <h3>No Experience Added</h3>;
    }

    return <div>{expTable}</div>;
  }
}

Experience.propTypes = {
  deleteExp: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExp }
)(Experience);
