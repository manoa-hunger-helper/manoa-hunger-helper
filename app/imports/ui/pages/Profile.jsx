import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import { AutoForm, TextField,LongTextField, SubmitField, NumField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MultiSelectField from '../components/MultiSelectField';
import { Preferences } from '../../api/preferences/Preferences';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesPreferences } from '../../api/profiles/ProfilesPreferences';
import { updateProfileMethod } from '../../startup/both/Methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allPreferences) => new SimpleSchema({
  price: { type: Number, label: 'Price', optional: true },
  name: { type: String, label: 'Name', optional: true },
  vendor: { type: String, label: 'Vendor', optional: true },
  bio: { type: String, label: 'Biographical statement', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  preferences: { type: Array, label: 'Preferences', optional: true },
  'preferences.$': { type: String, allowedValues: allPreferences },
});

/** Renders the Home Page: what appears after the user logs in. */
class Profile extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const name = Meteor.user().username;
    // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
    const allPreferences = _.pluck(Preferences.collection.find().fetch(), 'preferences');
    const formSchema = makeSchema(allPreferences);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // Now create the model with all the user information.
    const preferences = _.pluck(ProfilesPreferences.collection.find({ profile: name }).fetch(), 'preference');
    const profile = Profiles.collection.findOne({ name });
    const model = _.extend({}, profile, { preferences });
    return (
      <Grid id="home-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add food</Header>
          <AutoForm model={model} schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField id='name' name='name' showInlineError={true} placeholder={'Food Name'}/>
                <NumField id='price' name='price' showInlineError={true} />
                <TextField name='vendor' showInlineError={true} placeholder={'name'} disabled/>
              </Form.Group>
              <LongTextField id='bio' name='bio' placeholder='Describe the food...'/>
              <Form.Group widths={'equal'}>
                <TextField name='picture' showInlineError={true} placeholder={'URL to picture'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <MultiSelectField name='preferences' showInlineError={true} placeholder={'Preferences'}/>
              </Form.Group>
              <SubmitField id='addPref' value='Update'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

Profile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Preferences.userPublicationName);
  const sub2 = Meteor.subscribe(Profiles.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesPreferences.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(Profile);
