import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Vendors } from '../../api/vendor/Vendor';
import VendorItem from '../components/VendorItem';
// import vendorList from '../../../private/data.json';

/** Renders the Profile Collection as a set of Cards. */
class AllVendors extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    let myjson = {};
    if (Meteor.isServer) {
      myjson = JSON.parse(Assets.getText('data.json'));
      console.log(myjson);
    }
    return (
      <Container id="AllVendors-page">
        <Header as="h2" textAlign="center" color="orange" style={ { paddingTop: '30px', paddingBottom: '30px' }}>All Vendors</Header>
        <Card.Group centered style={{paddingBottom: '40px'}}>
          {this.props.vendors.map((vendors, index) => <VendorItem key={index} vendor={vendors}/>)}
        </Card.Group>
      </Container>
    );
  }
}

AllVendors.propTypes = {
  ready: PropTypes.bool.isRequired,
  vendors: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub2 = Meteor.subscribe(Vendors.userPublicationName);

  return {
    vendors: Vendors.collection.find({}).fetch(),
    ready: sub2.ready(),
  };
})(AllVendors);
