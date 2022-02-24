import React, { useContext, useEffect, useState } from 'react';

let todoContext = React.createContext();

export function useGlobState() {
  return useContext(todoContext);
}

export default function todoProvider({ children }) {
  let [numberOfItems, setNumberOfItems] = useState(2);
  let [showCompleted, toggleShowCompleted] = useState(false);
  let [sortBy, setSortBy] = useState('');
  let [difficulty, setDifficulty] = useState(3);
  let [state, setState] = useState();

  let startingState = {
    numberOfItems,
    setNumberOfItems,
    showCompleted,
    toggleShowCompleted,
    sortBy,
    setSortBy,
    difficulty,
    setDifficulty,
  }

  useEffect(() => {
    async function gettingState() {
      console.log('in there');
      let JSONstate = localStorage.getItem('state');
      if (JSONstate) setState(JSON.parse(JSONstate));
      else setState(startingState);
      console.log('get', localStorage);
    }
    gettingState();
  }, []);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
    console.log('set', localStorage);
  }, [state]);

  return (
    <todoContext.Provider value={startingState}>
      {children}
    </todoContext.Provider>
  )
}