import { useGlobState } from "../../context/context"

export default function ToDoList({ list, toggleComplete }) {
  return (
    list.map((item, idx) => (
      <div key={item.id + idx}>
        <p>{item.text}</p>
        <p><small>Assigned to: {item.assignee}</small></p>
        <p><small>Difficulty: {item.difficulty}</small></p>
        <div onClick={() => toggleComplete(item.id)}>Complete:</div>
        <hr />
      </div>
    ))
  )
}