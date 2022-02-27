import React from 'react';
import { Button, Card } from '@mui/material';

import { LoginContext } from './authContext.js';

class Signup extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: '',
    }
  }

  handleChange = e => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.context.signup(this.state.username, this.state.password, this.state.role);
  }

  render() {
    return (
      <Card>
        <form onSubmit={this.handleSubmit}>
          <input
            name='username'
            placeholder='username'
            onChange={this.handleChange}
          />
          <input
            name='password'
            placeholder='password'
            onChange={this.handleChange}
          />
          <input
            name='role'
            placeholder='enter role'
            onChange={this.handleChange}
          />
          <Button type='submit'>Signup</Button>
        </form>
      </Card>
    )
  }
}

export default Signup;