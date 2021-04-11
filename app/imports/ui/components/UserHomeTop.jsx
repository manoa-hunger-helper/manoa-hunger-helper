import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
// import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class UserHomeTop extends React.Component {
  render() {
    return (
      <div className ="user-home-background">
        <Grid container centered>
          <Header as="h1" inverted>Time to Eat!</Header>
        </Grid>
      </div>
    );
  }
}

export default UserHomeTop;
