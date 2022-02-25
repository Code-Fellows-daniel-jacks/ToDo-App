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
  let state = {
    numberOfItems,
    setNumberOfItems,
    showCompleted,
    toggleShowCompleted,
    sortBy,
    setSortBy,
    difficulty,
    setDifficulty,
  };

  useEffect(() => {
    let JSONstate = localStorage.getItem('state');
    let { numberOfItems, showCompleted, sortBy, difficulty } = JSON.parse(JSONstate);
    if (JSONstate) {
      setNumberOfItems(numberOfItems);
      toggleShowCompleted(showCompleted);
      setSortBy(sortBy);
      setDifficulty(difficulty);
    }
  //   // if (JSONstate) setState(prevState => {
  //   //   let { numberOfItems, showCompleted, sortBy, difficulty } = JSON.parse(JSONstate);
  //   //   return { ...prevState, numberOfItems, showCompleted, sortBy, difficulty }
  //   // });
  //   // else setState(startingState);
  }, []);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
    // console.log('setting', localStorage);
  }, [state]);
  return (
    <todoContext.Provider value={state}>
      {children}
    </todoContext.Provider>
  )
}