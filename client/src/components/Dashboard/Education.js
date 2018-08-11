import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Button, Icon } from 'semantic-ui-react';

import { deleteEdu } from '../../action';

class Education extends Component {
  render() {
    const displayAllEdu = this.props.education.map(edu => (
      <Table.Body key={edu._id}>
        <Table.Row>
          <Table.Cell>{edu.school}</Table.Cell>
          <Table.Cell>{edu.degree}</Table.Cell>
          <Table.Cell>{edu.field}</Table.Cell>
          <Table.Cell textAlign="right">
            <Button
              icon
              color="red"
              onClick={() => this.props.deleteEdu(edu._id)}
            >
              <Icon name="delete" />
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    ));

    let eduTable;

    if (this.props.education.length > 0) {
      eduTable = (
        <Table color="green" key="green">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>School</Table.HeaderCell>
              <Table.HeaderCell width={3}>Degree</Table.HeaderCell>
              <Table.HeaderCell width={3}>Field of study</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          {displayAllEdu}
        </Table>
      );
    } else {
      eduTable = <h3>No Education Added</h3>;
    }

    return <div>{eduTable}</div>;
  }
}

Education.propTypes = {
  deleteEdu: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEdu }
)(Education);
