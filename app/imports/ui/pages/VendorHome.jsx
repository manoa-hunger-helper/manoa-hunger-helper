import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the vendor homepage. */
class VendorHome extends React.Component {
  render() {
    return (
      <div className="vendor-home-background">
        <Grid columns={2} verticalAlign='middle' textAlign='center' container>
          <Grid.Row>
            <Header as='h1' inverted>Welcome! Vendor</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as='h2' inverted>My Vendor page</Header>
              <Icon name='edit' inverted size='huge'/>
              <Header as='h3' inverted>Allows you to edit your information such as adding or deleting a menu item;
                modifying the
                price or type of the item; changing the ethnicity, location, open hour, contact, payment option image of
                the restaurant.</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h2' inverted>All Vendor page</Header>
              <Icon name='list alternate outline' inverted size='huge'/>
              <Header as='h3' inverted>List all the vendors available at University of Hawaiʻi at Mānoa.</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default VendorHome;
