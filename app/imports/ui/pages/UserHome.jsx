import React from 'react';
import UserHomeBottom from '../components/UserHomeBottom';
import UserHomeTop from '../components/UserHomeTop';

/** A simple static component to render some text for the UserHome page. */
class UserHome extends React.Component {
  render() {
    return (
      <div>
        <UserHomeTop/>
        <UserHomeBottom/>
      </div>
    );
  }
}

export default UserHome;
