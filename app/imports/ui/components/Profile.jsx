import React from 'react';
import { Image, Card, Icon, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  render() {
    return (
      <Card centered>
        <Image size='huge' src={this.props.profile.picture} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.profile.name}</Card.Header>
          <Card.Meta>
            <Icon name="dollar sign" floated="right" />
            {this.props.profile.price}
          </Card.Meta>
          <Card.Description>
            {this.props.profile.bio}
          </Card.Description>
          <Card.Content extra>
            <Divider/>
            <Icon name='user' />
            {this.props.profile.vendor}
          </Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Profile);
