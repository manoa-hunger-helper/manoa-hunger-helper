import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Vendors } from '../../api/vendor/Vendor';

const bridge = new SimpleSchema2Bridge(Vendors.schema);

/** Renders the Page for adding a document. */
class AddVendor extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, image, price, location, state, businessdate, starttime, endtime, website, phone, email, type, owner } = data;
    Vendors.collection.insert({ name, image, price, location, state, businessdate, starttime, endtime, website, phone, email, type, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
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
          <Header as="h2" textAlign="center" color="orange" style={{ paddingTop: '30px', paddingBottom: '20px' }}>Add Vendor Information</Header>
          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
            <Segment>
              <TextField name='name' label='Vendor Name'/>
              <TextField name='image'/>
              <TextField name='price' label='Rate your vendor price using: $, $$, $$$'/>
              <TextField name='location'/>
              <SelectField name='state'/>
              <TextField name='businessdate' label='Business Date'/>
              <NumField name='starttime' label='Open Time (24-hour notation)' decimal={false} min={0} max={23} />
              <NumField name='endtime' label='Close Time (24-hour notation)' decimal={false} min={0} max={23} />
              <TextField name='website'/>
              <TextField name='phone'/>
              <TextField name='email'/>
              <TextField name='type' label='Vendor Type'/>
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

export default AddVendor;
