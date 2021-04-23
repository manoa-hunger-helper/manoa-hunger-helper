import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { AutoForm, HiddenField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Featured } from '../../api/featured/Featured';

const bridge = new SimpleSchema2Bridge(Featured.schema);

/** Renders the Page for adding a document. */
class AddFeatured extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, vendor, price, image, bio, vegan, drink, dessert, owner } = data;
    Featured.collection.insert({ name, vendor, price, image, bio, vegan, drink, dessert, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', `You just receive a thank you from ${vendor} !`, 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <AutoForm ref={ref => {
        fRef = ref;
      }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
        <Segment style={{ paddingBottom: '20px', paddingTop: '20px' }}>
          <Header as='h5'>Would you like to recommend this dish ?</Header>
          <SubmitField value='Yes!'/>
          <HiddenField name='name' value={this.props.menuitem.name}/>
          <HiddenField name='vendor' value={this.props.menuitem.vendor}/>
          <HiddenField name='price' value={this.props.menuitem.price}/>
          <HiddenField name='image' value={this.props.menuitem.image}/>
          <HiddenField name='bio' value={this.props.menuitem.bio}/>
          <HiddenField name='vegan' value={this.props.menuitem.vegan}/>
          <HiddenField name='drink' value={this.props.menuitem.drink}/>
          <HiddenField name='dessert' value={this.props.menuitem.dessert}/>
          <HiddenField name='owner' value={this.props.menuitem.owner}/>
        </Segment>
      </AutoForm>
    );
  }
}

AddFeatured.propTypes = {
  menuitem: PropTypes.object.isRequired,
};
export default AddFeatured;
