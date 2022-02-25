import React, { useContext, useEffect, useState } from 'react';
import { Card } from '@mui/material';

import { v4 as uuid } from 'uuid';

import './todo.scss';

import { useGlobState } from '../../context/context.js';
import Header from '../header/Header.jsx';
import useForm from '../../hooks/form.js';
import ToDoList from '../todoList/ToDoList.jsx';
import Pagination from '../pagination/pagination.jsx';

const ToDo = () => {
  let { numberOfItems, showCompleted, difficulty } = useGlobState();
  // console.log(numberOfItems, showCompleted, difficulty);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [listToDisplay, setListToDisplay] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {

    item.id = uuid();
    item.complete = false;
    setList([...list, item]);

  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
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
      </Card>
      <ToDoList list={listToDisplay} toggleComplete={toggleComplete} />
      <Pagination list={list} setPage={setPage} />
    </>
  );
};

export default ToDo;