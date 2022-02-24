import { useGlobState } from '../../context/context.js';

import { Slider, Button, ButtonGroup, Switch } from '@mui/material';
import './header.scss';

export default function Header({ incomplete }) {
  let { setNumberOfItems, toggleShowCompleted, showCompleted } = useGlobState();

  function handleChange(e) {
    e.preventDefault();
    setNumberOfItems(e.target.value);
  }

  function handleToggle(e) {
    e.preventDefault();
    let updatedVal = showCompleted ? false : true;
    toggleShowCompleted(updatedVal);
  }

  return (
    <header>
      <h1>To Do List: {incomplete} items pending</h1>
      <div className='contextController'>
        <h3>Context Controller</h3>
      <ButtonGroup>
          <Switch onChange={handleToggle} color="warning" />
        </ButtonGroup>
        <Slider aria-label="Temperature" onChange={handleChange} valueLabelDisplay='auto' defaultValue={2} step={2} marks min={2} max={10} />
      </div>
    </header>
  )
}