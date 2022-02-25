import Login from '../auth/login.js';
import { useGlobState } from '../../context/context.js';
import { LoginContext } from '../auth/authContext.js';

import { Slider, Button, Card, ButtonGroup, Switch, Modal } from '@mui/material';
import './header.scss';
import { useContext, useState } from 'react';

export default function Header({ incomplete }) {
  let { setNumberOfItems, toggleShowCompleted, showCompleted } = useGlobState();
  let authContext = useContext(LoginContext);
  let [open, setOpen] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    setNumberOfItems(e.target.value);
  }

  function handleToggle(e) {
    e.preventDefault();
    let updatedVal = showCompleted ? false : true;
    toggleShowCompleted(updatedVal);
  }

  function toggleClose() {
    open ? setOpen(false) : setOpen(true);
  }

  return (
    <>
      <header>
      <Card className='h1-card'>
        <h1>To Do List: {incomplete} items pending</h1>
      </Card>
      <Card className='contextController-card'>
        <h3>Context Controller</h3>
          <ButtonGroup>
            <Switch onChange={handleToggle} color='secondary' />
        </ButtonGroup>
          <Button>Hello</Button>
          <Button onClick={toggleClose}>{authContext.loggedIn ? 'Logout' : 'Login'}</Button>
        <Slider aria-label="Temperature" onChange={handleChange} valueLabelDisplay='auto' defaultValue={2} step={2} marks min={2} max={10} />
      </Card>
    </header>
      <Modal
        open={open}
        onClose={toggleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card>
          <Login toggleClose={toggleClose} />
        </Card>
      </Modal>
    </>
  )
}