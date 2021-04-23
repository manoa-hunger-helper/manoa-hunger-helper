import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { _ } from 'meteor/underscore';
import { Container, Loader, Card, Header, Segment } from 'semantic-ui-react';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MenuItem from '../components/MenuItem';
import { FoodMenus } from '../../api/menu/FoodMenu';
import MultiSelectField from '../components/MultiSelectField';
import { Vendors } from '../../api/vendor/Vendor';

const makeSchema = (allVendors) => new SimpleSchema({
  vendors: { type: Array, label: 'types', optional: true },
  'vendors.$': { type: String, allowedValues: allVendors },
});

/** Renders the Profile Collection as a set of Cards. */
class MyMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = { vendors: [] };
  }

  submit(data) {
    this.setState({ vendors: data.vendors || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const allVendors = _.pluck(Vendors.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allVendors);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const names = _.pluck(Vendors.collection.find({ name: { $in: this.state.vendors } }).fetch(), 'name');
    const food = FoodMenus.collection.find({ vendor: { $in: names } });

    return (
      <Container>
        <Header as="h2" textAlign="center" style={{ paddingTop: '10px' }}>Find The Vendor Menu </Header>
        <AutoForm style={{ paddingBottom: '100px', paddingTop: '10px' }} schema={bridge} onSubmit={data => this.submit(data)} >
          <Segment>
            <MultiSelectField id='vendors' name='vendors' showInlineError={true} placeholder={'Pick a vendor'}/>
            <SubmitField id='submit' value='Submit'/>
          </Segment>
        </AutoForm>
        <Card.Group>
          {food.map((menu, index) => <MenuItem
            key={index}
            menu={menu}
          />)}
        </Card.Group>
      </Container>
    );
  }
}

MyMenu.propTypes = {
  ready: PropTypes.bool.isRequired,
  foodMenus: PropTypes.array.isRequired,
  vendors: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(FoodMenus.userPublicationName);
  const sub2 = Meteor.subscribe(Vendors.userPublicationName);
  const ready = sub1.ready() && sub2.ready();
  const foodMenus = FoodMenus.collection.find({}).fetch();
  const vendors = Vendors.collection.find({}).fetch();

  return {
    foodMenus,
    vendors,
    ready,
  };
})(MyMenu);
