import React from 'react';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Information } from '../../api/information/Information';

const bridge = new SimpleSchema2Bridge(Information.schema);

/** Renders the Page for adding a document. */
class AddMyInformation extends React.Component {
  // On submit, insert the data.
  submit(data, formRef) {
    const { firstname, lastname, phoneNumber, address, image, owner } = data;
    Information.collection.insert({ firstname, lastname, phoneNumber, address, image, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Information added successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    let fRef = null;
    const currentId = Meteor.userId();
    const username = Meteor.users.findOne({ _id: currentId }).username;
    const owners = _.pluck(this.props.information, 'owner');
    const permit = _.contains(owners, username);
    return (
      <Grid id="add-my-info-page" container centered>
        {(!permit) ? (
          <Grid.Column>
            <Header as="h2" textAlign="center" color="orange" style={{ paddingTop: '30px', paddingBottom: '20px' }}>Add
                  Your Information when you are a new user</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)} style={{ marginBottom: '20px' }}>
              <Segment>
                <TextField name='image'/>
                <TextField name='firstname'/>
                <TextField name='lastname'/>
                <TextField name='phoneNumber'/>
                <TextField name='address'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value={Meteor.user().username}/>
              </Segment>
            </AutoForm>
          </Grid.Column>) : <Header as="h2" textAlign="center" color="orange"
          style={{ paddingTop: '50px', paddingBottom: '50px' }}> Sorry, you already added
            information!!!</Header>}
      </Grid>
    );
  }
}
AddMyInformation.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  information: PropTypes.array.isRequired,
};
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Information.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Information.collection.findOne(documentId);
  const information = Information.collection.find({}).fetch();
  return {
    doc,
    ready,
    information,
  };
})(AddMyInformation);
