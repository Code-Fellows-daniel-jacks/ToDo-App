import React from 'react';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import './app.scss';

import LoginContext from './components/auth/authContext.js';
import Context from './components/context/context.js';
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