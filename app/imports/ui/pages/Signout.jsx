import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    const outStyle = { paddingTop: '30px', paddingBottom: '50px' };
    Meteor.logout();
    return (
      <Header id="signout-page" as="h1" textAlign="center" style={ outStyle } color='orange'>
        See you next time!
      </Header>
    );
  }
}
