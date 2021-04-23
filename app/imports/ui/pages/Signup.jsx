import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', roles: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value, role }) => {
    this.setState({ [name]: value, role });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, role } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        if (role === 'vendor') {
          Meteor.call('addvendortonewuser');
        }
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const topStyle = { paddingTop: '30px', paddingBottom: '10px' };
    const bottomStyle = { paddingBottom: '50px' };
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      if (this.state.role === 'vendor') {
        swal('Success', 'Please, log in to your new account ');
        Meteor.logout();
        return <Redirect to="/signin"/>;
      }
      return <Redirect to={from}/>;
    }
    const { role } = this.state;
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2} style={ bottomStyle }>
          <Grid.Column>
            <Header as="h2" textAlign="center" color="orange" style={ topStyle }>
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Group inline>
                  <label>Account Type:</label>
                  <Form.Radio
                    label='Personal'
                    name='user'
                    value=''
                    role='user'
                    checked={role === 'user'}
                    onChange={this.handleChange}
                  />
                  <Form.Radio
                    label='Vendor'
                    name='vendor'
                    value='vendor'
                    role='vendor'
                    checked={role === 'vendor'}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
