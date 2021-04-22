import React from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AdminUserItem extends React.Component {
  removeItem(InfoID) {
    this.props.Information.collection.remove(InfoID);
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.info.owner}</Table.Cell>
        <Table.Cell>{this.props.info.firstname}</Table.Cell>
        <Table.Cell>{this.props.info.lastname}</Table.Cell>
        <Table.Cell>{this.props.info.favoriteVendor}</Table.Cell>
        <Table.Cell>{this.props.info.favoriteItem}</Table.Cell>
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
// Require a document to be passed to this component.
AdminUserItem.propTypes = {
  info: PropTypes.object.isRequired,
  Information: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(AdminUserItem);
