import { Button, ButtonGroup, Divider, Slider } from "@blueprintjs/core";
import { useGlobState } from "../../context/context";

export default function Pagination({ list }) {
  let { numberOfItems } = useGlobState();
  let arrayToRender = [];
  let pages = list.length / numberOfItems;
  for (let i = 0; i < pages; i += 1) {
    arrayToRender.push(
      <Button key={i + 1} text={i + 1} />
    )
  }
  return (
    <ButtonGroup>
      {arrayToRender}
    </ButtonGroup>
  )
}