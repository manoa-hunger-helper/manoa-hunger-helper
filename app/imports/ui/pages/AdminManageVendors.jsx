import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vendors } from '../../api/vendor/Vendor';
import AdminVendorData from '../components/AdminVendorData';
import { FoodMenus } from '../../api/menu/FoodMenu';
import AdminFoodMenuItem from '../components/AdminFoodMenuItem';

/** Renders a table containing all of the vendor documents. Use <MyVendorData> to render each row. */
class ManageVendors extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" color="orange" style={{ paddingTop: '30px', paddingBottom: '20px' }}>Manage Vendors</Header>
        {(this.props.vendors.length) ? (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>State</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
                <Table.HeaderCell>Contact</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Remove</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.vendors.map((vendor) => <AdminVendorData key={vendor._id} vendor={vendor} Vendors={Vendors}/>)}
            </Table.Body>
          </Table>
        ) : 'No vendor data'}

        {(this.props.foodmenus.length) ? (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Vendor</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Bio</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Vegan</Table.HeaderCell>
                <Table.HeaderCell>Drink</Table.HeaderCell>
                <Table.HeaderCell>Dessert</Table.HeaderCell>
                <Table.HeaderCell>Remove</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.foodmenus.map((foodmenu) => <AdminFoodMenuItem key={foodmenu._id} foodmenu={foodmenu} FoodMenus={FoodMenus}/>)}
            </Table.Body>
          </Table>
        ) : 'No menu data'}
      </Container>
    );
  }
}

// Require an array of Vendor documents in the props.
ManageVendors.propTypes = {
  vendors: PropTypes.array.isRequired,
  foodmenus: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Vendor documents.
  const subscription = Meteor.subscribe(Vendors.adminPublicationName);
  // Get access to FoodMenus documents.
  const subscription2 = Meteor.subscribe(FoodMenus.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Vendor documents
  const vendors = Vendors.collection.find().fetch();
  // Get the FoodMenus documents
  const foodmenus = FoodMenus.collection.find().fetch();
  return {
    vendors,
    foodmenus,
    ready,
  };
})(ManageVendors);
