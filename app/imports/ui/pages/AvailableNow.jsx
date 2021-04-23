import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import VendorItem from '../components/VendorItem';
import { Vendors } from '../../api/vendor/Vendor';

/** Renders the Profile Collection as a set of Cards. */
class AllVendors extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const currtime = new Date().getHours();
    const dayNum = new Date().getDay();
    const weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    const vendors = _.filter(this.props.vendors, function (vendor) {
      if (currtime >= vendor.starttime && currtime < vendor.endtime && vendor.businessdate.includes(weekday[dayNum])) {
        return vendor;
      }
      return 0;
    });
    return (
      <Container id="AllVendors-page">
        <Header as="h2" textAlign="center" color="orange" style={ { paddingTop: '30px', paddingBottom: '20px' }}>Vendor  Available  Now </Header>
        <Card.Group centered>
          {vendors.map((vendor, index) => <VendorItem key={index} vendor={vendor}/>)}
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
