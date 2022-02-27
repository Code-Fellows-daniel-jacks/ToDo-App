import React, { useContext, useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { When } from 'react-if';
import { v4 as uuid } from 'uuid';

import { useGlobState } from '../context/context.js';
import { LoginContext } from '../auth/authContext.js';
import Header from '../header/Header.jsx';
import useForm from '../../hooks/form.js';
import ToDoList from '../todoList/ToDoList.jsx';
import Pagination from '../pagination/pagination.jsx';

import './todo.scss';

const ToDo = () => {
  let { numberOfItems, showCompleted, list, setList } = useGlobState();
  let authContext = useContext(LoginContext);
  console.log(authContext);
  const [page, setPage] = useState(1);
  const [listToDisplay, setListToDisplay] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    setList([...list, item]);
  }

  function deleteItem(id) {
    fetch(`http://localhost:3001/api/v2/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${authContext.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(success => {
        const items = list.filter(item => item.id !== id);
        setList(items);
      })
      .catch(err => console.log(err));
  }

  function toggleComplete(id) {
    const itemToChange = list.find(item => item.id === id);
    const updatedBool = itemToChange.complete ? false : true;
    console.log('ITEM TO CHANGE HERE', itemToChange)
    fetch(`http://localhost:3001/api/v2/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${authContext.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        complete: updatedBool,
      })
    })
      .then(success => {
        const items = list.map(item => {
          if (item.id == id) {
            item.complete = !item.complete;
          }
          return item;
        });
        setList(items);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list, numberOfItems]);

  useEffect(() => {
    let index = (page * numberOfItems) - numberOfItems; // starting index for subList, in order to render different items for different pages
    let counter = (numberOfItems < list.length) ? (numberOfItems * page) : (list.length * page); // ending index, same as line above
    let booleanList = list.filter(item => item.complete === showCompleted || item.complete === false);
    let reducedList = booleanList.slice(index, counter);
    let processedList = reducedList.filter(item => item != null);
    setListToDisplay(processedList);
  }, [list, page, numberOfItems, showCompleted]);

  return (
    <>
      <Header incomplete={incomplete} />
      <Card className='form-card'>
        <When condition={authContext.loggedIn}>
          <form onSubmit={handleSubmit}>

            <h2>Add To Do Item</h2>

            <label>
              <span>To Do Item</span>
              <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
            </label>

            <label>
              <span>Assigned To</span>
              <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
            </label>

            <label>
              <span>Difficulty</span>
              <input onChange={handleChange} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
            </label>

            <label>
              <button type="submit">Add Item</button>
            </label>
          </form>
        </When>
        <When condition={!authContext.loggedIn}>
          <h2>Please login in order to interact with list</h2>
        </When>
      </Card>
      <ToDoList list={listToDisplay} toggleComplete={toggleComplete} deleteItem={deleteItem} />
      <Pagination list={list} setPage={setPage} />
    </>
  );
};

export default ToDo;