import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
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
        <Image large src={vendorInfo.image} wrapped ui={false}/>
        <Card.Content>
          <Card.Header>{vendorInfo.name}</Card.Header>
          <Card.Meta>{vendorInfo.location}</Card.Meta>
          <Card.Meta>{vendorInfo.operationDays}</Card.Meta>
          <Card.Meta>{vendorInfo.operationHours}</Card.Meta>
          <Card.Meta>{vendorInfo.paymentOptions}</Card.Meta>
          <Card.Meta>
            <Accordion>
              <Accordion.Title
                  active={activeIndex === 0}
                  index={0}
                  onClick={this.handleClick}>
                <Icon name='dropdown'/>
                Click to view dietary options
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                {vendorInfo.email}
              </Accordion.Content>
            </Accordion>
          </Card.Meta>
          <Card.Meta>
            {this.props.vendor.address}
          </Card.Meta>
          <Card.Meta>
            {this.props.vendor.phone}
          </Card.Meta>
          <Card.Description>
            <Accordion>
              <Accordion.Title
                  acive={activeIndex === 0}
                  index={0}
                  onClick={this.handleClick}>
                <Icon name='dropdown'/>
                Click to see description
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                {vendorInfo.description}
              </Accordion.Content>
            </Accordion>
          </Card.Description>
          {Roles.userIsInRole(Meteor.userId(), 'vendor') ? (<Card.Content extra>
            <Link to={`/edit/${this.props.vendor._id}`}>Edit</Link>
          </Card.Content>) : ''}
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
