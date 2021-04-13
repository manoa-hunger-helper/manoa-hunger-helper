import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Label, Icon, Divider, Button, Grid, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DeletePreference from '../components/DeletePreference';
import { Preferences } from '../../api/preferences/Preferences';
import AddPreference from '../components/AddPreference';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Profile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">My Profile</Header>
        <Divider horizontal>
          <Header as='h3'>
            <Icon name='food' />
              Current Preferences
          </Header>
        </Divider>
        <Label.Group fluid center size="large">
          {this.props.prefs.map((pref, index) => <DeletePreference key={index} pref={pref} owner={this.props.prefs.owner}/>)}
        </Label.Group>
        <Divider horizontal>
          <Header as='h3'>
            <Icon name='circle add' />
              Add Preferences
          </Header>
        </Divider>
        <AddPreference owner={this.props.prefs.owner}/>
        <Segment basic>
          <Grid>
            <Grid.Column textAlign="center">
              <Button as={Link} to='/fav' id="add-pref-button">Go To Smart Menu</Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

/** Require preferences */
Profile.propTypes = {
  prefs: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe(Preferences.userPublicationName);
  return {
    prefs: Preferences.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Profile);
