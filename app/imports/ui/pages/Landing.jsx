import React from 'react';
import LandingBottom from '../components/LandingBottom';
import LandingTop from '../components/LandingTop';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <LandingTop/>
        <LandingBottom/>
      </div>
    );
  }
}

export default Landing;
