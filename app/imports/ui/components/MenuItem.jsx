import React from 'react';
import { Image, Card, Icon, Divider, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddFeatured from './AddFeatured';

/** Renders a single row in the List Stuff table. */
class MenuItem extends React.Component {
  render() {
    return (
      <Card centered color='yellow'>
        <Image size='huge' src={this.props.menu.image} style={{ height: '290px' }}/>
        <Card.Content>
          <Card.Header>{this.props.menu.name}</Card.Header>
          <Card.Meta>
            <Icon name="dollar sign" floated="right" />
            {this.props.menu.price}
          </Card.Meta>
          <Card.Description>
            {this.props.menu.bio}
          </Card.Description>
          <Card.Content extra style={{ paddingBottom: '20px', paddingTop: '20px' }}>
            <AddFeatured menuitem={this.props.menu} />
          </Card.Content>
          <Card.Content extra>
            <Divider/>
            <Icon name='user' />
            {this.props.menu.vendor}
            <Rating style={{ paddingLeft: '20px' }} icon={'heart'} size='huge'
              defaultRating={0} maxRating={5}/>
          </Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
MenuItem.propTypes = {
  menu: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MenuItem);
