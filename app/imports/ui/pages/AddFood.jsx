import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, BoolField, ErrorsField, HiddenField, LongTextField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { FoodMenus } from '../../api/menu/FoodMenu';

const bridge = new SimpleSchema2Bridge(FoodMenus.schema);

/** Renders the Page for adding a document. */
class AddFood extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, vendor, price, image, bio, vegan, drink, dessert, owner } = data;
    FoodMenus.collection.insert({ name, vendor, price, image, bio, vegan, drink, dessert, owner },
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
      <Grid id="add-food-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" color="orange" style={{ paddingTop: '30px', paddingBottom: '20px' }}>Add Food</Header>
          <AutoForm ref={ref => {
            fRef = ref;
          }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
            <Segment>
              <TextField name='name'/>
              <TextField name='vendor'/>
              <NumField name='price' decimal={true}/>
              <TextField name='image'/>
              <LongTextField name='bio'/>
              <BoolField name='vegan' />
              <BoolField name='drink' />
              <BoolField name='dessert' />
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

export default AddFood;
