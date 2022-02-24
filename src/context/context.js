import React, { useContext, useState } from 'react';

let todoContext = React.createContext();

export function useGlobState() {
  return useContext(todoContext);
}

export default function todoProvider({ children }) {
  let [numberOfItems, setNumberOfItems] = useState(2);
  let [showCompleted, toggleShowCompleted] = useState(false);
  let [sortBy, setSortBy] = useState('');
  let [difficulty, setDifficulty] = useState(3);

  const state = {
    numberOfItems,
    setNumberOfItems,
    showCompleted,
    toggleShowCompleted,
    sortBy,
    setSortBy,
    difficulty,
    setDifficulty,
  }

  return (
    <todoContext.Provider value={state}>
      {children}
    </todoContext.Provider>
  )
}