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
    this.context.login(this.state.username, this.state.password);
    this.props.toggleClose();
  };

  render() {
    return (
      <Card className='login-card'>
        <When condition={this.context.loggedIn}>
          <h2>Are you sure you would like to logout?</h2>
          <Button onClick={() => {
            this.context.logout();
            this.props.toggleClose();
          }}>Log Out</Button>
        </When>

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
      </Card>
    );
  }
}

export default Login;