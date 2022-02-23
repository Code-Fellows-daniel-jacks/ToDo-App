import { Button, ButtonGroup, Divider, Slider } from "@blueprintjs/core";
import './header.scss';

export default function Header({ incomplete }) {
  function getChangeHandler(key) {
    return (value) => this.setState({ [key]: value });
  };

  return (
    <header>
      <h1>To Do List: {incomplete} items pending</h1>
      <ButtonGroup>
        <Button text='DarkMode' />
        <Button text='Edit' />
        <Divider />
        <Button text='+' />
        <div>Results Shown</div>
        <Button text='-' />
      </ButtonGroup>
    </header>
  )
}