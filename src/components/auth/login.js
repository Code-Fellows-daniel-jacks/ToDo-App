import React from 'react';
import { When } from 'react-if';
import { Button, Card } from '@mui/material';

import { LoginContext } from './authContext.js';

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.context);
    this.context.login(this.state.username, this.state.password);
    this.props.toggleClose();
  };

  render() {
    return (
      <Card className='login-card'>
        <When condition={!this.context.loggedIn}>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="UserName"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              name="password"
              onChange={this.handleChange}
            />
            <Button type='submit'>Login</Button>
          </form>
        </When>
        <When condition={this.context.loggedIn}>
          <h4>Are you sure you would like to logout?</h4>
          <Button onClick={this.context.logout}>Logout</Button>
        </When>
      </Card>
    );
  }
}

export default Login;