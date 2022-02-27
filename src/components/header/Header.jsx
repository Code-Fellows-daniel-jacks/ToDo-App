import { useContext, useState } from 'react';
import { Slider, Button, Card, ButtonGroup, Switch, Modal } from '@mui/material';
import { When } from 'react-if';

import Login from '../auth/login.js';
import Signup from '../auth/signup.js';
import { useGlobState } from '../context/context.js';
import { LoginContext } from '../auth/authContext.js';

import './header.scss';

export default function Header({ incomplete }) {
  let { setNumberOfItems, toggleShowCompleted, showCompleted } = useGlobState();
  let authContext = useContext(LoginContext);
  let [open, setOpen] = useState(false);
  let [modal, setModal] = useState('login');

  function handleChange(e) {
    e.preventDefault();
    setNumberOfItems(e.target.value);
  }

  function toggleComplete(e) {
    e.preventDefault();
    let updatedVal = showCompleted ? false : true;
    toggleShowCompleted(updatedVal);
  }

  function toggleClose() {
    open ? setOpen(false) : setOpen(true);
  }

  function handleClick(e) {
    setModal(e.target.name);
    toggleClose();
  }

  return (
    <>
      <header>
      <Card className='h1-card'>
        <h1>To Do List: {incomplete} items pending</h1>
      </Card>
      <Card className='contextController-card'>
        <h3>Context Controller</h3>
          <ButtonGroup className='switch'>
            <h4>Show Completed</h4>
            <Switch onChange={toggleComplete} defaultChecked={true} color='info' />
          </ButtonGroup>
          <Button className='login-button' name='login' onClick={handleClick}>{authContext.loggedIn ? 'Logout' : 'Login'}</Button>
          <Button className='signup-button' name='signup' onClick={handleClick}>Signup</Button>
          <div className='slider'>
            <h4>Items Per Page</h4>
            <Slider aria-label="Temperature" onChange={handleChange} valueLabelDisplay='auto' defaultValue={2} step={2} marks min={2} max={10} />
          </div>
      </Card>
    </header>
      <Modal
        open={open}
        onClose={toggleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="popup"
      >
        <Card>
          <When condition={modal === 'login'}>
            <Login toggleClose={toggleClose} /> 
          </When>
          <When condition={modal === 'signup'}>
            <Signup />
          </When>
        </Card>
      </Modal>
    </>
  )
}