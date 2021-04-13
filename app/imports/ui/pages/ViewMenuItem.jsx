import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesPreferences } from '../../api/profiles/ProfilesPreferences';

/** Returns the Profile and associated Projects and preferences associated with the passed user email. */
function getProfileData(name) {
  const data = Profiles.collection.findOne({ name });
  const preferences = _.pluck(ProfilesPreferences.collection.find({ profile: name }).fetch(), 'preference');
  // console.log(_.extend({ }, data, { preferences, projects: projectPictures }));
  return _.extend({ }, data, { preferences });
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini' src={props.profile.picture} />
      <Card.Header>{props.profile.name} {props.profile.name}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.profile.price}</span>
      </Card.Meta>
      <Card.Description>
        {props.profile.bio}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.profile.preferences,
        (pref, index) => <Label key={index} size='tiny' color='teal'>{pref}</Label>)}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class ViewMenuItem extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const vendors = _.pluck(Profiles.collection.find().fetch(), 'vendor');
    const profileData = vendors.map(vendor => getProfileData(vendor));
    return (
      <Container id="profiles-page">
        <Card.Group>
          {_.map(profileData, (profile, index) => <MakeCard key={index} profile={profile}/>)}
        </Card.Group>
      </Container>
    );
  }
}

ViewMenuItem.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(ProfilesPreferences.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready(),
  };
})(ViewMenuItem);
