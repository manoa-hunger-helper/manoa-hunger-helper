import React from 'react';
import { Image, Card, Icon, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MenuItem extends React.Component {
  render() {
    return (
      <Card centered>
        <Image size='huge' src={this.props.menu.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.menu.name}</Card.Header>
          <Card.Meta>
            <Icon name="dollar sign" floated="right" />
            {this.props.menu.price}
          </Card.Meta>
          <Card.Description>
            {this.props.menu.bio}
          </Card.Description>
          <Card.Content extra>
            <Divider/>
            <Icon name='user' />
            {this.props.menu.vendor}
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
