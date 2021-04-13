import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment } from 'semantic-ui-react';
import { AutoForm, SubmitField, SelectField /* , HiddenField */ } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Preferences } from '../../api/preferences/Preferences';

const formSchema = new SimpleSchema({
  pref: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const preferences = [
  { label: 'Vegan', value: 'vegan' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'Drink', value: 'drink' },
  { label: 'Chinese', value: 'chinese' },
  { label: 'Japanese', value: 'japanese' },
  { label: 'Japanese', value: 'japanese' },
  { label: 'Hawaiian', value: 'hawaiian' },
];

/** Renders the Page for adding a document. */
class AddPreference extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name } = data;
    const owner = Meteor.user().username;
    Preferences.collection.insert({ name, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Pref added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <Segment>
          <SelectField name='preferences' label='Preferences' options={preferences} id="add-pref"/>
          <SubmitField value='Submit' id="submit-pref"/>
        </Segment>
      </AutoForm>
    );
  }
}

AddPreference.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default AddPreference;
