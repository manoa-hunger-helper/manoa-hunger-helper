import React from 'react';
import { Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';
// import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class LandingTop extends React.Component {
  render() {
    return (
      <div className ="landing-middle">
        <Grid container centered>
          <Header as="h1" inverted>Welcome!</Header>
        </Grid>
        <Divider hidden/>
        <Grid columns={3} verticalAlign='top' textAlign='center' container>
          <Grid.Column>
            <Segment inverted tertiary color='#f9a602'><Header as='h2' inverted size='huge '>As a User</Header>
              <Icon name='users' inverted size='huge'/>
              <Header as='h3' inverted>Hi, users! You can go through our vendors-related pages to find out Where you can
                eat. You will be able to search specific dishes offered by the vendors and see today&apos;s
                featured. </Header></Segment>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' inverted>As a Vendor</Header>
            <Icon name='edit' inverted size='huge'/>
            <Header as='h3' inverted>Hi, vendors! You can edit your store information and your menu easily.Give a
          detail description for your food to attract more hungry people.</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' inverted>As a Admin</Header>
            <Icon name='edit' inverted size='huge'/>
            <Header as='h3' inverted>Hi, admins! Thank you for maintaining the cleanliness of the app.</Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LandingTop;
