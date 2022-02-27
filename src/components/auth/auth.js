import React from 'react';
import { When } from 'react-if';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { LoginContext } from './authContext.js';

const fakeResponse = rest.post('http://localhost:3001/signin', (req, res, ctx) => {
  return res(ctx.json({
    "capabilities": (4)['read', 'create', 'update', 'delete'],
    "createdAt": "2022-02-27T20:25:56.847Z",
    "id": 1,
    "password": "$2b$10$zKwoELndgnAPz1miGLI3he5mVazlUhx3M9dcfyAmpctQ0hUMMiIwK",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NDU5OTgzMjh9.V-taVFqdTHotwWTvmkJWPv20pv-HRZSoSZvh1bQdroU",
    "updatedAt": "2022-02-27T20:25:56.847Z",
    "username": "test",
  }));
});

class Auth extends React.Component {

  static contextType = LoginContext;

  render() {
    const isLoggedIn = this.context.loggedIn;
    const canDo = this.props.capability ? this.context.can(this.props.capability) : true;
    const okToRender = isLoggedIn && canDo;

    return (
      <When condition={okToRender}>
        {this.props.children}
      </When>
    );
  }
}

export default Auth;