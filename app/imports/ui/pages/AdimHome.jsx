import React from 'react';
import AdminBottom from '../components/AdminBottom';
import AdminTop from '../components/AdminTop';
import LandingBottom from '../components/LandingBottom';

/** A simple static component to render some text for the vendor homepage. */
class AdminHome extends React.Component {
  render() {
    return (
      <div>
        <AdminTop/>
        <AdminBottom/>
      </div>
    );
  }
}

export default AdminHome;
