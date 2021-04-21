import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
// import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class UserHomeTop extends React.Component {
  render() {
    return (
      <div className ="user-home-background">
        <Grid textAlign='center'>
          <Header as='h1'inverted className="home-header">Aloha! Time to Eat!</Header>
        </Grid>
        <Grid columns={2} verticalAlign='top' textAlign='center' container>
          <Grid.Column>
            <Header as='h2' inverted>All Vendors</Header>
            <Icon name='map' inverted size='huge'/>
            <Header as='h3' inverted>Views all vendors at Uh Manoa </Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' inverted>Today&apos;s Top picks</Header>
            <Icon name='food' inverted size='huge'/>
            <Header as='h3' inverted>See today&apos;s featured dishes</Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default UserHomeTop;
