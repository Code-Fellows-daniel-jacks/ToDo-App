import React, { useContext, useEffect, useState } from 'react';

import { LoginContext } from '../auth/authContext.js';

let todoContext = React.createContext();

export function useGlobState() {
  return useContext(todoContext);
}

export default function todoProvider({ children }) {
  let authContext = useContext(LoginContext);

  let [numberOfItems, setNumberOfItems] = useState(2);
  let [showCompleted, toggleShowCompleted] = useState(true);
  let [sortBy, setSortBy] = useState('');
  let [difficulty, setDifficulty] = useState(3);
  let [list, setList] = useState([]);

  let state = {
    numberOfItems,
    setNumberOfItems,
    showCompleted,
    toggleShowCompleted,
    sortBy,
    setSortBy,
    difficulty,
    setDifficulty,
    list,
    setList
  };

  useEffect(() => {
    if (authContext.token) {
      fetch('http://localhost:3001/api/v2/todo', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${authContext.token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(results => results.json())
        .then(data => {
          setList(data);
        })
        .catch(reject => {
          console.log('Did not do it', reject);
        })
    }
  }, [numberOfItems, showCompleted, sortBy, difficulty, authContext]);

  return (
    <todoContext.Provider value={state}>
      {children}
    </todoContext.Provider>
  )
}