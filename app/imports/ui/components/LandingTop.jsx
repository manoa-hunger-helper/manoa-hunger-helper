import React from 'react';
import { Divider, Grid, Header, Icon} from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class LandingTop extends React.Component {
  render() {
    return (
      <div className ="landing-middle">
        <Grid container centered>
          <Header className="home-header" as="h1" inverted>Welcome!</Header>
        </Grid>
        <Divider section hidden/>
        <Grid columns={3} verticalAlign='top' textAlign='center' container>
          <Grid.Column>
            <Icon name='users' inverted size='huge'/>
            <Header as='h2' inverted>As a User</Header>
            <Header as='h3' inverted>Hi, users! You can go through our vendors-related pages to find out Where you can
                eat. You will be able to search specific dishes offered by the vendors and see today&apos;s
                featured. </Header>
          </Grid.Column>
          <Grid.Column>
            <Icon name='edit' inverted size='huge'/>
            <Header as='h2' inverted>As a Vendor</Header>
            <Header as='h3' inverted>Hi, vendors! You can edit your store information and your menu easily.Give a
          detail description for your food to attract more hungry people.</Header>
          </Grid.Column>
          <Grid.Column>
            <Icon name='edit' inverted size='huge'/>
            <Header as='h2' inverted>As a Admin</Header>
            <Header as='h3' inverted>Hi, admins! Thank you for maintaining the cleanliness of the app.</Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LandingTop;
