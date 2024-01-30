import React, { useState } from "react";
import { v4 as uuid } from 'uuid';

/** Form for adding box.
 *
 * Props:
 * - createBox: fn to call in parent
 *
 * State:
 * formData: { height: number, width: number, backgroundColor }
 *
 * BoxList -> NewBoxForm
 */

interface IBoxForm {
  height: string;
  width: string;
  backgroundColor: string;
}

interface INewBoxFormProps {
  createBox: Function;
}

const INITIAL_DATA: IBoxForm = {height: "5", width: "5", backgroundColor: ""};

function NewBoxForm({ createBox }: INewBoxFormProps) {
  const [formData, setFormData] = useState<IBoxForm>(INITIAL_DATA);

  /** Update form input. */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Submit form: call function from parent & clear inputs. */
  function handleSubmit(evt: React.FormEvent): void {
    evt.preventDefault();
    createBox({ ...formData, id: uuid() });
    setFormData(INITIAL_DATA);
  }

  return (
      <div className="NewBoxForm">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newBox-height">Height</label>
            <input
                id="newBox-height"
                onChange={handleChange}
                name="height"
                value={formData.height}
                type="number"
            />
          </div>
          <div>
            <label htmlFor="newBox-width">Width</label>
            <input
                id="newBox-width"
                onChange={handleChange}
                name="width"
                value={formData.width}
                type="number"
            />
          </div>
          <div>
            <label htmlFor="newBox-backgroundColor">Background Color</label>
            <input
                id="newBox-backgroundColor"
                onChange={handleChange}
                name="backgroundColor"
                value={formData.backgroundColor}
            />
          </div>
          <button className="NewBoxForm-addBtn">Add a new box!</button>
        </form>
      </div>
  );
}

export default NewBoxForm;
