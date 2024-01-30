/** Colored box presentation
 *
 * Props:
 * - id (unique)
 * - width
 * - height
 * - backgroundColor
 * - remove (function to call)
 *
 * States:
 * - None
 *
 * BoxList -> Box
 */

interface IBox {
  id: string;
  width: number;
  height: number;
  backgroundColor: string;
  remove?: Function;
}

function Box({ id, width = 5, height = 5, backgroundColor, remove }: IBox) {

  /** Remove a box. */
  function handleRemove(): void {
    if (remove) {
      remove(id);
    }
  }

  return (
    <div className="Box">
      <div className="Box-box"
        style={{
          height: `${height}em`,
          width: `${width}em`,
          backgroundColor: backgroundColor
        }}
      />
      <button
        className="Box-removeBtn"
        onClick={handleRemove}>
        Remove The Box!
      </button>
    </div>
  );
}

export default Box;
export { type IBox };
