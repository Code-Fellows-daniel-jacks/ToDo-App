import React from 'react';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import './app.scss';

import Auth from './components/auth/auth.js';
import Login from './components/auth/login.js';
import LoginContext from './components/auth/context.js';
import Context from './context/context.js';
import ToDo from './components/todo/todo.jsx';

export default class App extends React.Component {
  render() {
    return (
      <LoginContext>

        <Context>
          <ToDo />
        </Context>

      </LoginContext>
    );
  }
}