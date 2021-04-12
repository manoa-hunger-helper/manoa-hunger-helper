import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
// import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class AdminTop extends React.Component {
  render() {
    return (
      <div className ="admin-middle">
        <Grid container centered>
          <div className="admin-tex"><p>Welcome! Admin</p></div>
        </Grid>
      </div>
    );
  }
}

export default AdminTop;
