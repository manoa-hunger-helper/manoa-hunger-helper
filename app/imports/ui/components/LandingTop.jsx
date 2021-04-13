import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
// import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class LandingTop extends React.Component {
  render() {
    return (
      <div className ="landing-middle">
        <Grid container centered>
          <Header as="h1" inverted>Very Welcome!</Header>
        </Grid>
      </div>
    );
  }
}

export default LandingTop;
