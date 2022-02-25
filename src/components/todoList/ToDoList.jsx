import { Card } from '@mui/material';
import { useGlobState } from "../../context/context"
import './ToDoList.scss';


export default function ToDoList({ list, toggleComplete }) {
  return (
    <div className='list-grid'>
      {list.map((item, idx) => (
        <Card key={item.id + idx}>
        <p>{item.text}</p>
        <p><small>Assigned to: {item.assignee}</small></p>
        <p><small>Difficulty: {item.difficulty}</small></p>
          <p>{item.id}</p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
        <hr />
        </Card>
      ))}
    </div>
  )
}