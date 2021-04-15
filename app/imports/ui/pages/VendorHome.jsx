import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the vendor homepage. */
class VendorHome extends React.Component {
  render() {
    return (
      <div className="vendor-home-background">
        <Grid columns={4} verticalAlign='middle' textAlign='center' container>
          <Grid.Row>
            <Header as='h1' inverted>Welcome! Vendor</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as='h2' inverted>My Vendor</Header>
              <Icon name='edit' inverted size='huge'/>
              <Header as='h3' inverted>View and edit your vendor information.</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h2' inverted>All Vendor</Header>
              <Icon name='list alternate outline' inverted size='huge'/>
              <Header as='h3' inverted>List all the vendors available at University of Hawaiʻi at Mānoa.</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h2' inverted>Add Vendor</Header>
              <Icon name='food' inverted size='huge'/>
              <Header as='h3' inverted>Add your vendor information.</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h2' inverted>Add Food</Header>
              <Icon name='ordered list' inverted size='huge'/>
              <Header as='h3' inverted>Add new food to your menu.</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default VendorHome;
