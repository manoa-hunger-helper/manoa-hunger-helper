import React from 'react';
import { Table, Image, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. */
class MyInformationData extends React.Component {
  removeItem(InfoID) {
    this.props.Information.collection.remove(InfoID);
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell><Image src={this.props.info.image} size='small'/></Table.Cell>
        <Table.Cell>{this.props.info.owner}</Table.Cell>
        <Table.Cell>{this.props.info.firstname}</Table.Cell>
        <Table.Cell>{this.props.info.lastname}</Table.Cell>
        <Table.Cell>{this.props.info.phoneNumber}</Table.Cell>
        <Table.Cell>{this.props.info.address}</Table.Cell>
        <Table.Cell>
          <Link to={`/editUserInfor/${this.props.info._id}`}>Edit</Link>
        </Table.Cell>
        <Table.Cell>
          <Button icon onClick={() => this.removeItem(this.props.info._id)}>
            <Icon name='trash'/>
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// <Link to={`/edit/${this.props.vendor._id}`}>Edit</Link>

// Require a document to be passed to this component.
MyInformationData.propTypes = {
  info: PropTypes.object.isRequired,
  Information: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MyInformationData);
