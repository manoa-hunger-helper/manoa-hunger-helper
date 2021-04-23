import React from 'react';
import { Grid, Segment, Header,} from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Information } from '../../api/information/Information';

const bridge = new SimpleSchema2Bridge(Information.schema);

/** Renders the Page for adding a document. */
class AddMyInformation extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstname, lastname, favoriteVendor, favoriteItem, image, owner } = data;
    Information.collection.insert({ firstname, lastname, favoriteVendor, favoriteItem, image, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Information added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" color="orange" style={{ paddingTop: '30px', paddingBottom: '20px' }}>Add Your Information when you are a new user</Header>
          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => this.submit(data, fRef)} style={{ marginBottom: '20px' }}>
            <Segment>
              <TextField name='image'/>
              <TextField name='firstname'/>
              <TextField name='lastname'/>
              <TextField name='favoriteVendor'/>
              <TextField name='favoriteItem'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner' value={Meteor.user().username}/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddMyInformation;
