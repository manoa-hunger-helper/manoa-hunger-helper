import React from 'react';
import AdminBottom from '../components/AdminBottom';
import VendorHomeTop from '../components/VendorHomeTop';

/** A simple static component to render some text for the vendor homepage. */
class VendorHome extends React.Component {
  render() {
    return (
      <div id="vendor-home-page">
        <VendorHomeTop/>
        <AdminBottom/>
      </div>
    );
  }
}

export default VendorHome;
