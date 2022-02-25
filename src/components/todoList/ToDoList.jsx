import Auth from '../auth/auth.js';

import { Card } from '@mui/material';
import { useGlobState } from "../../context/context"
import './ToDoList.scss';


export default function ToDoList({ list, toggleComplete, deleteItem }) {
  return (
    <Auth capability='read'>
      <div className='list-grid'>
      {list.map((item, idx) => (
        <Card key={item.id + idx}>
        <p>{item.text}</p>
        <p><small>Assigned to: {item.assignee}</small></p>
        <p><small>Difficulty: {item.difficulty}</small></p>
          <Auth capability="update">
            <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          </Auth>
          <Auth capability="delete">
            <div onClick={() => deleteItem(item.id)}>Delete</div>
          </Auth>
        </Card>
      ))}
      </div>
    </Auth>
  )
}