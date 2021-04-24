import React from 'react';
import UserHomeTop from '../components/UserHomeTop';
import LandingBottom from '../components/LandingBottom';

/** A simple static component to render some text for the UserHome page. */
class UserHome extends React.Component {
  render() {
    return (
      <div id="user-home-page">
        <UserHomeTop/>
        <LandingBottom/>
      </div>
    );
  }
}

export default UserHome;
