import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Vendors } from '../../api/vendor/Vendor';
import MyVendorData from '../components/MyVendorData';
import { FoodMenus } from '../../api/menu/FoodMenu';
import FoodMenuItem from '../components/FoodMenuItem';

/** Renders a table containing all of the vendor documents. Use <MyVendorData> to render each row. */
class MyVendor extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id="my-vendor-page">
        <Header as="h2" textAlign="center" color="orange" style={{ paddingTop: '30px', paddingBottom: '20px' }}>My Vendor</Header>
        {(this.props.vendors.length) ? (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>State</Table.HeaderCell>
                <Table.HeaderCell>Payment Options</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
                <Table.HeaderCell>Contact</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.vendors.map((vendor) => <MyVendorData key={vendor._id} vendor={vendor}/>)}
            </Table.Body>
          </Table>
        ) : (<div>
          <p>No vendor data, please go to add vendor, update your vendor information</p>
          <Link to="/add-vendor-info" >Click here to add your vendor information</Link>
        </div>) }

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
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Remove</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.foodmenus.map((foodmenu) => <FoodMenuItem key={foodmenu._id} foodmenu={foodmenu} FoodMenus={FoodMenus}/>)}
            </Table.Body>
          </Table>
        ) : (<div>
          <p>No menu data, please go to add food, update your menu information</p>
          <Link to="/add-menu-food">Click here to add food to your menu</Link>
        </div>)}
      </Container>
    );
  }
}

// Require an array of Vendor documents in the props.
MyVendor.propTypes = {
  vendors: PropTypes.array.isRequired,
  foodmenus: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Vendor documents.
  const subscription = Meteor.subscribe(Vendors.vendorPublicationName);
  // Get access to FoodMenus documents.
  const subscription2 = Meteor.subscribe(FoodMenus.vendorPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Vendor documents
  const vendors = Vendors.collection.find({}).fetch();
  // Get the FoodMenus documents
  const foodmenus = FoodMenus.collection.find({}).fetch();
  return {
    vendors,
    foodmenus,
    ready,
  };
})(MyVendor);
