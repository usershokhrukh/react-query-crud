import React, {useEffect, useState} from "react";
import { useAddTodo } from "../hooks/useAddTodo";

const AddModal = ({modal, errorSet}) => {
  const {mutate, error} = useAddTodo()
  const [addForm, setAddForm] = useState({
    id: null,
    title: "",
    completed: false,
    priority: "high",
  });
  const handleChange = (e) => {
    setAddForm({
      ...addForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    errorSet(error?.message)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(addForm.title) {
      mutate(addForm)
      modal(false)
    }
  }
  return (
    <div className="modal-box">
      <form onSubmit={handleSubmit} className="modal-form">
        <input
        className="form-input"
          onChange={handleChange}
          name="title"
          placeholder="Title"
          type="text"
        />
        <select onChange={handleChange} name="priority" id="">
          <option value="high">high</option>
          <option value="medium">medium</option>
          <option value="low">low</option>
        </select>
        <div className="form-box">
          <button type="submit" className="form-buttons">admit</button>
          <button type="button" onClick={() => {
            modal(false)
          }} className="form-buttons">cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddModal;
