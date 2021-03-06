import React from 'react';
import { Table, Image, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. */
class AdminVendorData extends React.Component {
  removeItem(vendorID) {
    this.props.Vendors.collection.remove(vendorID);
  }

  render() {
    const currtime = new Date().getHours();
    if (currtime >= this.props.vendor.starttime && currtime <= this.props.vendor.endtime) {
      this.props.vendor.state = 'Open';
    } else {
      this.props.vendor.state = 'Close';
    }
    return (
      <Table.Row>
        <Table.Cell>{this.props.vendor.name}</Table.Cell>
        <Table.Cell><Image src={this.props.vendor.image} size='small'/></Table.Cell>
        <Table.Cell>{this.props.vendor.price}</Table.Cell>
        <Table.Cell>{this.props.vendor.location}</Table.Cell>
        <Table.Cell>{this.props.vendor.state}</Table.Cell>
        <Table.Cell>
          <p>Business Day: {this.props.vendor.businessdate}</p>
          <p>Hours: {this.props.vendor.starttime} - {this.props.vendor.endtime}</p>
        </Table.Cell>
        <Table.Cell>
          <p>Website: {this.props.vendor.website}</p>
          <p>Phone: {this.props.vendor.phone}</p>
          <p>Email: {this.props.vendor.email}</p>
        </Table.Cell>
        <Table.Cell>{this.props.vendor.type}</Table.Cell>
        <Table.Cell>
          <Button icon onClick={() => this.removeItem(this.props.vendor._id)}>
            <Icon name='trash'/>
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// <Link to={`/edit/${this.props.vendor._id}`}>Edit</Link>

// Require a document to be passed to this component.
AdminVendorData.propTypes = {
  vendor: PropTypes.object.isRequired,
  Vendors: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(AdminVendorData);
