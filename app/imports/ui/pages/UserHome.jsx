import React from 'react';
import UserHomeBottom from '../components/UserHomeBottom';
import UserHomeTop from '../components/UserHomeTop';
import LandingBottom from '../components/LandingBottom';

/** A simple static component to render some text for the UserHome page. */
class UserHome extends React.Component {
  render() {
    return (
      <div>
        <UserHomeTop/>
        <LandingBottom/>
      </div>
    );
  }
}

export default UserHome;
