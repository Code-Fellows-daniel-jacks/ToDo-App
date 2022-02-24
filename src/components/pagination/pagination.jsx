import { Button, ButtonGroup } from '@mui/material';
import { useGlobState } from "../../context/context";
import './pagination.scss';

export default function Pagination({ list, setPage }) {
  let { numberOfItems } = useGlobState();
  let arrayToRender = [];
  let pages = list.length / numberOfItems;

  function handleClick(e) {
    e.preventDefault();
    let pageNum = parseInt(e.target.id)
    setPage(pageNum);
  }

  for (let i = 0; i < pages; i += 1) {
    let pageNum = i + 1;
    arrayToRender.push(
      <Button onClick={handleClick} key={pageNum} variant='contained' id={pageNum} >{pageNum}</Button>
    )
  }

  return (
    <ButtonGroup>
      {arrayToRender}
    </ButtonGroup>
  )
}