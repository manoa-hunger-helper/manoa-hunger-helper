import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import AdminUserItem from '../components/AdminUserItem';
import { Information } from '../../api/information/Information';
/** Renders a table containing all of the vendor documents. Use <MyVendorData> to render each row. */
class AdminManageUsers extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Grid id="manage-user-page" container centered >
        <Header as="h2" textAlign="center" color="orange" style={{ paddingTop: '30px', paddingBottom: '20px' }}>Manage Users Information</Header>
        <Table celled style={{ marginBottom: '80px' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User image</Table.HeaderCell>
              <Table.HeaderCell>User email</Table.HeaderCell>
              <Table.HeaderCell>firstname</Table.HeaderCell>
              <Table.HeaderCell>lastname</Table.HeaderCell>
              <Table.HeaderCell>favorite vendor</Table.HeaderCell>
              <Table.HeaderCell>favorite item</Table.HeaderCell>
              <Table.HeaderCell>edit</Table.HeaderCell>
              <Table.HeaderCell>Remove</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.information.map((info) => <AdminUserItem key={info._id} info={info} Information={Information} />)}
          </Table.Body>
        </Table>
      </Grid>
    );
  }
}

// Require an array of Vendor documents in the props.
AdminManageUsers.propTypes = {
  information: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Users documents.
  const subscription = Meteor.subscribe(Information.adminPublicationName);
  const ready = subscription.ready();
  // Get the User documents
  const information = Information.collection.find().fetch();
  return {
    information,
    ready,
  };
})(AdminManageUsers);
