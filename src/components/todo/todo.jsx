import React, { useContext, useEffect, useState } from 'react';

import { useGlobState } from '../../context/context.js';
import Header from '../header/Header.jsx';
import useForm from '../../hooks/form.js';
import ToDoList from '../todoList/ToDoList.jsx';
import Pagination from '../pagination/pagination.jsx';

import { v4 as uuid } from 'uuid';

const ToDo = () => {
  let { numberOfItems, page, showCompleted, difficulty } = useGlobState();
  // console.log(numberOfItems, page, showCompleted, difficulty);
  const [list, setList] = useState([]);
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
  }, [list]);

  useEffect(() => {
    let tempArr = [];
    let index = (page * numberOfItems) - numberOfItems;
    let counter = (numberOfItems < list.length) ? (numberOfItems * page) : (list.length * page);
    for (index; index < counter; index += 1) {
      if (list[index]) {
        tempArr[index] = list[index];
      }
    }
    setListToDisplay(tempArr);
  }, [list]);

  return (
    <>
      <Header incomplete={incomplete} />
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
      <ToDoList list={listToDisplay} />
      <Pagination list={list} />
    </>
  );
};

export default ToDo;