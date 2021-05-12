import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import FeaturedMenuItem from '../components/FeaturedMenuItem';
import { Featured } from '../../api/featured/Featured';

/** Renders the Profile Collection as a set of Cards. */
class TodayTopPicks extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const names = _.uniq(_.pluck(this.props.featured, 'name'));
    // const uniqueFeatured = Featured.collection.find({ name: { $in: names } });
    const uniqueFeatured = _.map(names, (entry) => Featured.collection.findOne({ name: entry }));
    return (
      <Container id="TodayTopPicks-page">
        <Header as="h2" textAlign="center" color="orange" style={{ paddingTop: '30px', paddingBottom: '20px' }}>
          Today&apos;s Top picks </Header>
        <Card.Group style={{paddingBottom: '20px'}}>
          {uniqueFeatured.map(
            (menu, index) => <FeaturedMenuItem key={index} menu={menu}/>,
          )}
        </Card.Group>
      </Container>
    );
  }
}

TodayTopPicks.propTypes = {
  ready: PropTypes.bool.isRequired,
  featured: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Featured.userPublicationName);
  const ready = sub1.ready();
  const featured = Featured.collection.find().fetch();
  return {
    featured,
    ready,
  };
})(TodayTopPicks);
