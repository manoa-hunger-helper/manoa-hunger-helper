import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Preferences } from '../../api/preferences/Preferences';

class DeletePreference extends React.Component {
  handleDeleteClick = () => {
    const findCollection = Preferences.collection.find({ pref: this.props.pref.pref }).fetch();
    // console.log(findCollection);
    const myId = findCollection[0]._id;
    Preferences.collection.remove(myId);
    console.log('removed preference');
  }

  render() {
    return (
      <Label>
        {this.props.pref.name}

        <Icon name='delete' link onClick={ () => this.handleDeleteClick()}/>
      </Label>
    );
  }
}

/** Require a document to be passed to this component. */
DeletePreference.propTypes = {
  key: PropTypes.string.isRequired,
  pref: PropTypes.object.isRequired,
  owner: PropTypes.string.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(DeletePreference);
