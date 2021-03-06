import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '0px', background: 'linear-gradient(rgba(255,161,102,1),rgba(249,166,2,0.5))' };
    const landing = () => {
      if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
        return '/vendor-home';
      }
      if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
        return '/admin-home';
      }
      if ((Meteor.userId() !== null)) {
        return '/user-home';
      }
      return '/';
    };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted color="yellow" >
        <Menu.Item as={NavLink} activeClassName="" exact to={landing()}>
          <Header inverted as='h1'>manoa-hunger-helper</Header>
        </Menu.Item>
        {(this.props.currentUser && !Roles.userIsInRole(Meteor.userId(), 'vendor') && !Roles.userIsInRole(Meteor.userId(), 'admin')) ? (
          [
            <Menu.Item id="all-vendor-page" as={NavLink} activeClassName="active" exact to="/all-vendors" key='all'>All Vendors</Menu.Item>,
            <Menu.Item id="available-now-page" as={NavLink} activeClassName="active" exact to="/available-vendors" key='now'>Available
              Now</Menu.Item>,
            <Menu.Item id="today-top-picks-page" as={NavLink} activeClassName="active" exact to="/todays-top-picks" key='picks'>Todays Top
              Picks</Menu.Item>,
            <Menu.Item id="menu-page" as={NavLink} activeClassName="active" exact to="/view" key='all-menus'>Menus</Menu.Item>,
            <Menu.Item key='recomm'>
              <Dropdown id="recomm-dropdown" text="Recommendation">
                <Dropdown.Menu>
                  <Dropdown.Item id="vegan-menu-page" as={NavLink} activeClassName="active" exact to="/vegan-menu" key='vegan'>Vegetarian</Dropdown.Item>
                  <Dropdown.Item id="drink-menu-page" as={NavLink} activeClassName="active" exact to="/drink-menu" key='drink'>Drink</Dropdown.Item>
                  <Dropdown.Item id="dessert-menu-page" as={NavLink} activeClassName="active" exact to="/dessert-menu" key='dessert'>Dessert</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>,
            <Menu.Item key='user information'>
              <Dropdown id="information-dropdown" text=" User Information">
                <Dropdown.Menu>
                  <Dropdown.Item id="my-information" as={NavLink} activeClassName="active" exact to="/my-information" key='drink'>view my informtion </Dropdown.Item>
                  <Dropdown.Item id="add-my-information" as={NavLink} activeClassName="active" exact to="/add-my-information" key='add-my-information'>add my information</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>,
          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'vendor') ? (
          [<Menu.Item id="my-vendor-page" as={NavLink} activeClassName="active" exact to="/my-vendor" key='my-vendor'>My Vendor</Menu.Item>,
            <Menu.Item id="add-vendor-page" as={NavLink} activeClassName="active" exact to="/add-vendor-info" key='add-vendor-info'>Add
              Vendor</Menu.Item>,

            <Menu.Item id="add-menu-food-page" as={NavLink} activeClassName="active" exact to="/add-menu-food" key='add-menu-food'>Add
              Food</Menu.Item>,
            <Menu.Item key='information'>
              <Dropdown id="information-dropdown" text=" Owner Information">
                <Dropdown.Menu>
                  <Dropdown.Item id="my-information" as={NavLink} activeClassName="active" exact to="/my-information" key='drink'>view my information </Dropdown.Item>
                  <Dropdown.Item id="add-my-information" as={NavLink} activeClassName="active" exact to="/add-my-information" key='add-my-information'>add my information</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>,
          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          [<Menu.Item id="manage-user-page" as={NavLink} activeClassName="active" exact to="/admin-manage-users" key='admin-manage-users'>Manage Users</Menu.Item>,
            <Menu.Item id="manage-vendor-page" as={NavLink} activeClassName="active" exact to="/admin-manage-vendors" key='admin-manage-vendors'>Manage Vendors</Menu.Item>,
          ]
        ) : ''}
        <Menu.Item id="all-vendor-page" as={NavLink} activeClassName="active" exact to="/all-vendors" key='all'>All Vendors</Menu.Item>,
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
