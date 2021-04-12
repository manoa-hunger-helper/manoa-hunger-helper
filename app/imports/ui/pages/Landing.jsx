import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Redirect } from 'react-router-dom';
import LandingBottom from '../components/LandingBottom';
import LandingTop from '../components/LandingTop';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        {(Meteor.userId() !== null) && !Roles.userIsInRole(Meteor.userId(), 'admin') && !Roles.userIsInRole(Meteor.userId(), 'vendor') ? (
          <Redirect to='/user-home'/>
        ) : ''}
        <LandingTop/>
        <LandingBottom/>
      </div>
    );
  }
}

export default Landing;
