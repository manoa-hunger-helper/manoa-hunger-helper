import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListStuff from '../pages/ListStuff';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddStuff from '../pages/AddStuff';
import EditStuff from '../pages/EditStuff';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import UserHome from '../pages/UserHome';
import Menu from '../pages/Menu';
import VeganMenu from '../pages/VeganMenu';
import DessertMenu from '../pages/DessertMenu';
import DrinkMenu from '../pages/DrinkMenu';
import AllVendors from '../pages/AllVendors';
import TodayTopPicks from '../pages/TodayTopPicks';
import AvailableNow from '../pages/AvailableNow';
import VendorHome from '../pages/VendorHome';
import MyVendor from '../pages/MyVendor';
import AdimHome from '../pages/AdimHome';
import EditVendorInformation from '../pages/EditVendorInformation';
import EditMyMenu from '../pages/EditMyMenu';
import AddVendor from '../pages/AddVendor';
import AddFood from '../pages/AddFood';
import AdminManageVendors from '../pages/AdminManageVendors';
import MyMenu from '../pages/MyMenu';
import AdminManageUsers from '../pages/AdminManageUsers';
import EditUserInformation from '../pages/EditUserInformation';
import AddMyInformation from '../pages/AddMyInformation';
import MyInformation from '../pages/MyInformation';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/add-my-information" component={AddMyInformation}/>
            <ProtectedRoute path="/user-home" component={UserHome}/>
            <ProtectedRoute path="/my-information1" component={MyInformation}/>
            <ProtectedRoute path="/all-vendors" component={AllVendors}/>
            <ProtectedRoute path="/available-vendors" component={AvailableNow}/>
            <ProtectedRoute path="/todays-top-picks" component={TodayTopPicks}/>
            <ProtectedRoute path="/view" component={Menu}/>
            <ProtectedRoute path="/pick" component={MyMenu}/>
            <ProtectedRoute path="/vegan-menu" component={VeganMenu}/>
            <ProtectedRoute path="/drink-menu" component={DrinkMenu}/>
            <ProtectedRoute path="/dessert-menu" component={DessertMenu}/>
            <VendorProtectedRoute path="/vendor-home" component={VendorHome}/>
            <VendorProtectedRoute path="/my-vendor" component={MyVendor}/>
            <VendorProtectedRoute path="/add-vendor-info" component={AddVendor}/>
            <VendorProtectedRoute path="/add-menu-food" component={AddFood}/>
            <VendorProtectedRoute path="/editVedorInfor/:_id" component={EditVendorInformation}/>
            <VendorProtectedRoute path="/editMyMenu/:_id" component={EditMyMenu}/>
            <Route path="/my-information" component={MyInformation}/>
            <ProtectedRoute path="/list" component={ListStuff}/>
            <ProtectedRoute path="/add" component={AddStuff}/>
            <ProtectedRoute path="/edit/:_id" component={EditStuff}/>
            <AdminProtectedRoute path="/admin-home" component={AdimHome}/>
            <AdminProtectedRoute path="/admin-manage-users" component={AdminManageUsers}/>
            <AdminProtectedRoute path="/admin-manage-vendors" component={AdminManageVendors}/>
            <Route path="/editUserInfor/:_id" component={EditUserInformation}/>
            <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * VendorProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and vendor role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const VendorProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isVendor = Roles.userIsInRole(Meteor.userId(), 'vendor');
      return (isLogged && isVendor) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each VendorProtectedRoute.
VendorProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
