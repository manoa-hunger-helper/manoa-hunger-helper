import React from 'react';
import { Image, Card, Icon, Accordion, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VendorItem extends React.Component {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const vendorInfo = this.props.vendor;
    const { activeIndex } = this.state;
    return (
      <Card>
        <Image size='large' src={vendorInfo.image} wrapped ui={false} style={{ height: '290px' }}/>
        <Card.Content>
          <Card.Header>{vendorInfo.name}</Card.Header>
          <Card.Meta>{vendorInfo.location}</Card.Meta>
          <Card.Meta>{vendorInfo.businessdate}</Card.Meta>
          <Card.Meta>From {vendorInfo.starttime}:00 to {vendorInfo.endtime}:00</Card.Meta>
          <Card.Meta>{vendorInfo.paymentOptions}</Card.Meta>
          <Card.Meta>
            <Accordion>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}>
                <Icon name='dropdown'/>
                Click to view my websit
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <a href={vendorInfo.website}> {vendorInfo.website}</a>
              </Accordion.Content>
            </Accordion>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Link to={'/pick'}><Button color={'red'}>Find My Menu</Button></Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
VendorItem.propTypes = {
  vendor: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(VendorItem);
