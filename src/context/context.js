import React from 'react';

export const todoContext = React.createContext();

function todoProvider(props) {
  const state = {
    nubmerOFItems: 0,
    showCompleted: true,
    difficulty: 0,
  }

  return (
    <todoContext.Provider value={state}>
      {props.children}
    </todoContext.Provider>
  )
}

export default todoProvider;