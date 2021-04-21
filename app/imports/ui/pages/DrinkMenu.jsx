import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MenuItem from '../components/MenuItem';
import { FoodMenus } from '../../api/menu/FoodMenu';

/** Renders the Profile Collection as a set of Cards. */
class Menus extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container id="drink-menu-page">
        <Header as="h2" textAlign="center" color="orange" style={{ paddingTop: '30px', paddingBottom: '20px' }}>View Drinks </Header>
        <Card.Group>
          {this.props.foodMenus.map((menu, index) => <MenuItem key={index} menu={menu}/>)}
        </Card.Group>
      </Container>
    );
  }
}

Menus.propTypes = {
  ready: PropTypes.bool.isRequired,
  foodMenus: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(FoodMenus.userPublicationName);
  const ready = sub1.ready();
  const foodMenus = FoodMenus.collection.find({ drink: true }).fetch();
  return {
    foodMenus,
    ready,
  };
})(Menus);
