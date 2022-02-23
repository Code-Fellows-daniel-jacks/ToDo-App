import React from 'react';

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