import React, { useContext, useState } from 'react';

let todoContext = React.createContext();

export function useGlobState() {
  return useContext(todoContext);
}

export default function todoProvider({ children }) {
  const state = {
    numberOfItems: 2,
    page: 3,
    showCompleted: true,
    sortBy: '',
    difficulty: 0,
  }

  return (
    <todoContext.Provider value={state}>
      {children}
    </todoContext.Provider>
  )
}