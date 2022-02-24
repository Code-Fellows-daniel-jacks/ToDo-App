import React from 'react';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import './app.scss';

import Context from './context/context.js';
import ToDo from './components/todo/todo.jsx';

export default class App extends React.Component {
  render() {
    return (
      <Context>
        <ToDo />
      </Context>
    );
  }
}