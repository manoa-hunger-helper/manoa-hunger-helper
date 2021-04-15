import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class VendorItem extends React.Component {
  render() {
    return (
      <Card centered>
        <Image size='huge' src={this.props.vendor.image} style={{ height: '290px' }}/>
        <Card.Content>
          <Card.Header>{this.props.vendor.name}</Card.Header>
          <Card.Meta>
            {this.props.vendor.address}
          </Card.Meta>
          <Card.Meta>
            {this.props.vendor.businessdate}
            <p>{this.props.vendor.starttime}:00 --- {this.props.vendor.endtime}:00</p>
          </Card.Meta>
          <Card.Meta>
            {this.props.vendor.address}
          </Card.Meta>
          <Card.Meta>
            {this.props.vendor.phone}
          </Card.Meta>

          <Card.Description>
            {this.props.vendor.location}
          </Card.Description>
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
