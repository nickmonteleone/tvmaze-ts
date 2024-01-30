import { useState } from "react";
import Box, { IBox } from "./Box";
import NewBoxForm from "./NewBoxForm";

/** Manage list of boxes
 *
 * Props:
 * - None
 *
 * State:
 * - boxes: [ { id, width, height, backgroundColor }, ... ]
 *
 * App -> BoxList -> Box
 */

function BoxList() {
  const [boxes, setBoxes] = useState<IBox[]>([])

  /** add box with given { id, width, height, backgroundColor } */
  function add(newBox: IBox): void {
    setBoxes(boxes => [...boxes, newBox]);
  }

  /** remove box matching that id. */
  function remove(id: string): void {
    setBoxes(boxes => boxes.filter(box => box.id !== id));
  }

  return (
    <div className="BoxList">
      <NewBoxForm createBox={add} />
      {boxes.map(({ id, width, height, backgroundColor }) => (
        <Box
          key={id}
          id={id}
          width={width}
          height={height}
          remove={remove}
          backgroundColor={backgroundColor}
        />
      ))}
    </div>
  );
}

export default BoxList;
