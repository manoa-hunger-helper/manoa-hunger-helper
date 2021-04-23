import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Information } from '../../api/information/Information';

/** Renders a table containing all of the vendor documents. Use <MyVendorData> to render each row. */
class MyInformation extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const currentId = Meteor.userId();
    const username = Meteor.users.findOne({ _id: currentId }).username;

    const info = _.filter(this.props.information, function (infos) {
      if (username === infos.owner) {
        return infos;
      }
      return 0;
    });
    return (
      <Container>
        <Header as="h2" textAlign="center" color="orange" style={{ paddingTop: '30px', paddingBottom: '20px' }}>My Information</Header>
        <Table celled style={{ marginBottom: '30px' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>email</Table.HeaderCell>
              <Table.HeaderCell>firstname</Table.HeaderCell>
              <Table.HeaderCell>lastname</Table.HeaderCell>
              <Table.HeaderCell>favoriteVendor</Table.HeaderCell>
              <Table.HeaderCell>favoriteItem</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell><Image src={info.image} size='small'/></Table.Cell>
              <Table.Cell>{info.owner}</Table.Cell>
              <Table.Cell>{info.firstname}</Table.Cell>
              <Table.Cell>{info.lastname}</Table.Cell>
              <Table.Cell>{info.favoriteVendor}</Table.Cell>
              <Table.Cell>{info.favoriteItem}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

      </Container>
    );
  }
}

// Require an array of Vendor documents in the props.
MyInformation.propTypes = {
  information: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Vendor documents.
  const subscription = Meteor.subscribe(Information.vendorPublicationName);
  // Get access to FoodMenus documents.
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Vendor documents
  const information = Information.collection.find({}).fetch();
  return {
    information,
    ready,
  };
})(MyInformation);
